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

interface authSendArgs {
    oauthData: SocialUser
}

class Auth {
    public success: Function

    constructor(
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService
    ) {}

    set onSuccess(func: Function) {
        this.success = func
    }

    makeParams(kwargs: authSendArgs): HttpParams {
        const googleAuthData = JSON.stringify(kwargs.oauthData)
        return new HttpParams().set("google_auth_data", googleAuthData)
    }

    send(kwargs: authSendArgs): void {
        const authApiRequest: Observable<any> = this.http.get(URLS.AUTH, {
            params: this.makeParams(kwargs),
        })

        console.log(authApiRequest)

        authApiRequest.subscribe({
            next: (backendResponse) => this.success(backendResponse),
            error: (error) => this.HTTPErrorHandler.handle(error),
        })
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
