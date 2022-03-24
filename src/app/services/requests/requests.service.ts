import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient, HttpParams } from "@angular/common/http"
import { HttpErrorHandlerService } from "@services/http-error-handler"
import { makeUrl } from "@utils/constructors"

const port = 5001
const protocol = "http"

const URLS = {
    AUTH: makeUrl("authorize", port, protocol),
}

class Base {
    public success: Function
    public request: Observable<any>
    public params = new HttpParams()
    public URL: string

    constructor(
        public http: HttpClient,
        public HTTPErrorHandler: HttpErrorHandlerService
    ) {}

    set onSuccess(func: Function) {
        this.success = func
    }

    makeParams(kwargs: Object) {}

    makeRequest() {
        this.request = this.http.get(this.URL, {
            params: this.params,
        })
    }

    send(kwargs: any): void {
        this.makeParams(kwargs)
        this.makeRequest()

        this.request.subscribe({
            next: (backendResponse) => this.success(backendResponse),
            error: (error) => this.HTTPErrorHandler.handle(error),
        })
    }
}

interface authSendArgs {
    oauthData: SocialUser
}

class Auth extends Base {
    override URL = URLS.AUTH

    constructor(http: HttpClient, HTTPErrorHandler: HttpErrorHandlerService) {
        super(http, HTTPErrorHandler)
    }

    override makeParams(kwargs: authSendArgs) {
        const googleAuthData = JSON.stringify(kwargs.oauthData)
        this.params = new HttpParams().set("google_auth_data", googleAuthData)
    }
}

@Injectable({
    providedIn: "root",
})
export class RequestsService {
    auth: Auth

    constructor(
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService
    ) {
        this.auth = new Auth(http, HTTPErrorHandler)
    }
}
