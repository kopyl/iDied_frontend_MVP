import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient, HttpParams } from "@angular/common/http"
import { HttpErrorHandlerService } from "src/app/http-error-handler/http-error-handler.service"

interface authSendArgs {
    oauthData: SocialUser
}

class Auth {
    public success: Function
    private readonly API_AUTH_URL = "http://idied.org:5001/authorize"

    constructor(private http, private HTTPErrorHandler) {}

    set onSuccess(func: Function) {
        this.success = func
    }

    send(kwargs: authSendArgs): void {
        const googleAuthData = JSON.stringify(kwargs.oauthData)
        const params = new HttpParams().set("google_auth_data", googleAuthData)

        const authApiRequest: Observable<any> = this.http.get(
            this.API_AUTH_URL,
            { params }
        )

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
