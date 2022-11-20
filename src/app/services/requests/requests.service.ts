import { Injectable } from '@angular/core'
import { Observable, of, timer } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpErrorHandlerService } from '@services/http-error-handler'
import { makeUrlObj } from '@utils/constructors'
import { first, retryWhen, mergeMap, catchError } from 'rxjs/operators'
import { environment } from '@environment'

const port = 5001
const protocol = 'http'

const logAttempt = (attempt: number) => {
    console.log(`HTTP request attempt № ${attempt}`)
}

const URLS = {
    AUTH: makeUrlObj({ endpoint: 'authorize', port: port, protocol: protocol }),

    LOGOUT: makeUrlObj({ endpoint: 'logout', port: port, protocol: protocol }),

    NOTES_PRIVATE: makeUrlObj({
        endpoint: 'notes/private',
        port: port,
        protocol: protocol,
    }),
    NOTES_PUBLIC: makeUrlObj({
        endpoint: 'notes/public',
        port: port,
        protocol: protocol,
        retriedAllowed: true,
        errorNotification: false,
    }),

    ONLINE: makeUrlObj({
        endpoint: 'users/online',
        port: port,
        protocol: protocol,
        retriedAllowed: false,
        errorNotification: false,
    }),
    TG_REPORT: makeUrlObj({
        customApiUrl: `${environment.baseUrl}/api/tg-report`,
        errorNotification: false,
        retriedAllowed: false,
        skipHttpErrors: true,
    }),
}

abstract class Request {
    protected success: Function
    protected request: Observable<any>
    protected params = new HttpParams()
    protected errorMessage: string
    protected body: Object = {}
    protected abstract method: string
    protected abstract URL: requestURL

    constructor(
        public http: HttpClient,
        public HTTPErrorHandler: HttpErrorHandlerService
    ) {}

    protected makeParams(kwargs: Object) {}
    protected makeBody(kwargs: Object) {}

    protected makeRequest() {
        if (this.method === 'GET') {
            this.request = this.http.get(this.URL.url, {
                params: this.params,
            })
        } else if (this.method === 'POST') {
            this.request = this.http.post(this.URL.url, this.body, {
                params: this.params,
            })
        } else if (this.method === 'PUT') {
            this.request = this.http.put(this.URL.url, this.body, {
                params: this.params,
            })
        } else if (this.method === 'DELETE') {
            this.request = this.http.delete(this.URL.url, {
                params: this.params,
                body: this.body,
            })
        }
    }

    public set onSuccess(func: Function) {
        this.success = func
    }

    private exponentialRetry() {
        return mergeMap((_, i) => {
            const retryAttempt = i + 1
            if (retryAttempt > 10) {
                logAttempt(retryAttempt)
                this.HTTPErrorHandler.handle({
                    message: this.errorMessage,
                    enabled: this.URL.errorNotification ?? true,
                })
                return timer(10000)
            } else {
                const waitms = retryAttempt * 1000
                logAttempt(retryAttempt)
                if (retryAttempt % 3 === 0) {
                    this.HTTPErrorHandler.handle({
                        message: this.errorMessage,
                        enabled: this.URL.errorNotification ?? true,
                    })
                }
                return timer(waitms)
            }
        })
    }

    public send(kwargs: any = null): void {
        this.makeParams(kwargs)
        this.makeBody(kwargs)
        this.makeRequest()

        const actions = {}

        if (!this.URL.errorNotification) {
            actions['error'] = (error) => {}
        } else {
            actions['error'] = (error) =>
                this.HTTPErrorHandler.handle({ message: this.errorMessage })
        }

        if (this.success) {
            actions['next'] = this.success
        }

        if (!this.URL.retriedAllowed && !this.URL.skipHttpErrors) {
            this.request.subscribe(actions)
        } else if (this.URL.skipHttpErrors) {
            this.request.pipe(catchError((_) => of(false))).subscribe(actions)
        } else {
            this.request
                .pipe(
                    retryWhen((errors) => errors.pipe(this.exponentialRetry())),
                    first((v) => true)
                )
                .subscribe(actions)
        }
    }
}

class Auth extends Request {
    method = 'GET'
    URL = URLS.AUTH

    override makeParams(kwargs: authSendArgs) {
        const googleAuthData = JSON.stringify(kwargs.oauthData)
        this.params = new HttpParams().set('google_auth_data', googleAuthData)
    }
}

class Logout extends Request {
    method = 'GET'
    URL = URLS.LOGOUT
}

class Notes {
    get: GetNotes
    save: SaveNote
    create: CreateNote
    remove: RemoveNote
    share: ShareNote
    unshare: UnshareNote
    revoke: RevokeNote

    constructor(
        public http: HttpClient,
        public HTTPErrorHandler: HttpErrorHandlerService
    ) {
        this.get = new GetNotes(http, HTTPErrorHandler)
        this.save = new SaveNote(http, HTTPErrorHandler)
        this.create = new CreateNote(http, HTTPErrorHandler)
        this.remove = new RemoveNote(http, HTTPErrorHandler)
        this.share = new ShareNote(http, HTTPErrorHandler)
        this.unshare = new UnshareNote(http, HTTPErrorHandler)
        this.revoke = new RevokeNote(http, HTTPErrorHandler)
    }
}

class GetNotes extends Request {
    method = 'GET'
    URL = URLS.NOTES_PRIVATE
    override errorMessage = 'notes'
}

class SaveNote extends Request {
    method = 'POST'
    URL = URLS.NOTES_PRIVATE

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
        }
    }
}

class CreateNote extends SaveNote {
    override errorMessage = 'createNote'
}

class RemoveNote extends Request {
    method = 'DELETE'
    URL = URLS.NOTES_PRIVATE

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
        }
    }
}

class ShareNote extends Request {
    method = 'POST'
    URL = URLS.NOTES_PRIVATE
    override errorMessage = 'share'

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
            share: true,
        }
    }
}

class UnshareNote extends Request {
    method = 'POST'
    URL = URLS.NOTES_PRIVATE
    override errorMessage = 'unshare'

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
            unshare: true,
        }
    }
}

class RevokeNote extends Request {
    method = 'POST'
    URL = URLS.NOTES_PRIVATE
    override errorMessage = 'revoke'

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
            revoke: true,
        }
    }
}

class Online extends Request {
    method = 'PUT'
    URL = URLS.ONLINE
    override errorMessage = 'online'
}

class GetNoteForRecipient extends Request {
    method = 'GET'
    URL = URLS.NOTES_PUBLIC
    override errorMessage = 'note-for-recipient'

    override makeParams(sharingToken: string) {
        this.params = new HttpParams().set('sharingToken', sharingToken)
    }
}

class DestroyNoteForRecipient extends Request {
    method = 'DELETE'
    URL = URLS.NOTES_PUBLIC
    override errorMessage = 'note-for-recipient-destroy'
}

class NoteForRecipient {
    get: GetNoteForRecipient
    destroy: DestroyNoteForRecipient

    constructor(
        public http: HttpClient,
        public HTTPErrorHandler: HttpErrorHandlerService
    ) {
        this.get = new GetNoteForRecipient(http, HTTPErrorHandler)
        this.destroy = new DestroyNoteForRecipient(http, HTTPErrorHandler)
    }
}

class SendTGreport extends Request {
    method = 'POST'
    URL = URLS.TG_REPORT

    override makeBody(report: string) {
        this.body = report
    }
}

@Injectable({
    providedIn: 'root',
})
export class RequestsService {
    auth: Auth
    notes: Notes
    online: Online
    noteForRecipient: NoteForRecipient
    logout: Logout
    sendTGreport: SendTGreport

    constructor(
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService
    ) {
        this.auth = new Auth(http, HTTPErrorHandler)
        this.notes = new Notes(http, HTTPErrorHandler)
        this.online = new Online(http, HTTPErrorHandler)
        this.noteForRecipient = new NoteForRecipient(http, HTTPErrorHandler)
        this.logout = new Logout(http, HTTPErrorHandler)
        this.sendTGreport = new SendTGreport(http, HTTPErrorHandler)
    }
}

// 'https://idied.org/api/logout'
