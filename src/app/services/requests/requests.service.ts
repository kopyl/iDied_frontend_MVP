import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient, HttpParams } from "@angular/common/http"
import { HttpErrorHandlerService } from "@services/http-error-handler"
import { makeUrl } from "@utils/constructors"

const port = 5001
const protocol = "http"

const URLS = {
    AUTH: makeUrl("authorize", port, protocol),
    NOTES: {
        GET: makeUrl("notes", port, protocol),
    },
}

class Request {
    protected success: Function
    protected request: Observable<any>
    protected params = new HttpParams()
    protected URL: string
    protected errorMessage: string

    constructor(
        public http: HttpClient,
        public HTTPErrorHandler: HttpErrorHandlerService
    ) {}

    public set onSuccess(func: Function) {
        this.success = func
    }

    protected makeParams(kwargs: Object) {}

    protected makeRequest() {
        this.request = this.http.get(this.URL, {
            params: this.params,
        })
    }

   public send(kwargs: any = null): void {
        this.makeParams(kwargs)
        this.makeRequest()

        this.request.subscribe({
            next: (backendResponse) => this.success(backendResponse),
            error: (error) =>
                this.HTTPErrorHandler.handle(error, this.errorMessage),
        })
    }
}

class Auth extends Request {
    override URL = URLS.AUTH

    override makeParams(kwargs: authSendArgs) {
        const googleAuthData = JSON.stringify(kwargs.oauthData)
        this.params = new HttpParams().set("google_auth_data", googleAuthData)
    }
}

class Notes {

    get: GetNotes

    constructor(
        public http: HttpClient,
        public HTTPErrorHandler: HttpErrorHandlerService
    ) {
        this.get = new GetNotes(http, HTTPErrorHandler)
    }
}

class GetNotes extends Request {
    override URL = URLS.NOTES.GET
    override errorMessage = "notes"
}

@Injectable({
    providedIn: "root",
})
export class RequestsService {
    auth: Auth
    notes: Notes

    constructor(
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService
    ) {
        this.auth = new Auth(http, HTTPErrorHandler)
        this.notes = new Notes(http, HTTPErrorHandler)
    }
}
