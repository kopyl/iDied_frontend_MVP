import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient, HttpParams } from "@angular/common/http"
import { HttpErrorHandlerService } from "@services/http-error-handler"
import { makeUrl } from "@utils/constructors"
import { delay, first, retryWhen, repeat } from "rxjs/operators"

const port = 5001
const protocol = "http"

const URLS = {
    AUTH: makeUrl("authorize", port, protocol),
    NOTES: makeUrl("notes", port, protocol),
    ONLINE: makeUrl("users/online", port, protocol),
}

abstract class Request {
    protected success: Function
    protected request: Observable<any>
    protected params = new HttpParams()
    protected errorMessage: string
    protected body: Object = {}
    protected abstract method: string
    protected abstract URL: string

    constructor(
        public http: HttpClient,
        public HTTPErrorHandler: HttpErrorHandlerService
    ) {}

    protected makeParams(kwargs: Object) {}
    protected makeBody(kwargs: Object) {}

    protected makeRequest() {
        if (this.method === "GET") {
            this.request = this.http.get(this.URL, {
                params: this.params,
            })
        } else if (this.method === "POST") {
            this.request = this.http.post(this.URL, this.body, {
                params: this.params,
            })
        } else if (this.method === "PUT") {
            this.request = this.http.put(this.URL, this.body, {
                params: this.params,
            })
        } else if (this.method === "DELETE") {
            this.request = this.http.delete(this.URL, {
                params: this.params,
                body: this.body,
            })
        }
    }

    public set onSuccess(func: Function) {
        this.success = func
    }

    public send(kwargs: any = null): void {
        this.makeParams(kwargs)
        this.makeBody(kwargs)
        this.makeRequest()

        const actions = {
            error: (error) =>
                this.HTTPErrorHandler.handle(error, this.errorMessage),
        }

        if (this.success) {
            actions["next"] = this.success
        }

        if (this.URL.includes("online")) {
            // no infinite retries since it's alredy in loop
            this.request.subscribe(actions)
        } else {
            // infinite requests till success
            this.request
                .pipe(
                    retryWhen((errors) => errors.pipe(delay(1000), repeat())),
                    first((v) => true)
                )
                .subscribe(actions)
        }
    }
}

class Auth extends Request {
    method = "GET"
    URL = URLS.AUTH

    override makeParams(kwargs: authSendArgs) {
        const googleAuthData = JSON.stringify(kwargs.oauthData)
        this.params = new HttpParams().set("google_auth_data", googleAuthData)
    }
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
    method = "GET"
    URL = URLS.NOTES
    override errorMessage = "notes"
}

class SaveNote extends Request {
    method = "POST"
    URL = URLS.NOTES

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
        }
    }
}

class CreateNote extends SaveNote {}

class RemoveNote extends Request {
    method = "DELETE"
    URL = URLS.NOTES

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
        }
    }
}

class ShareNote extends Request {
    method = "POST"
    URL = URLS.NOTES
    override errorMessage = "share"

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
            share: true,
        }
    }
}

class UnshareNote extends Request {
    method = "POST"
    URL = URLS.NOTES
    override errorMessage = "unshare"

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
            unshare: true,
        }
    }
}

class RevokeNote extends Request {
    method = "POST"
    URL = URLS.NOTES
    override errorMessage = "revoke"

    override makeBody(note: saveNoteArgs) {
        this.body = {
            note: note,
            revoke: true,
        }
    }
}

class Online extends Request {
    method = "PUT"
    URL = URLS.ONLINE
    override errorMessage = "online"
}

@Injectable({
    providedIn: "root",
})
export class RequestsService {
    auth: Auth
    notes: Notes
    online: Online

    constructor(
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService
    ) {
        this.auth = new Auth(http, HTTPErrorHandler)
        this.notes = new Notes(http, HTTPErrorHandler)
        this.online = new Online(http, HTTPErrorHandler)
    }
}
