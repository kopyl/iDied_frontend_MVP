import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login"
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http"

import { Observable } from "rxjs"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
    providedIn: "root",
})
export class GoogleAuthService {
    readonly API_AUTH_URL = "http://idied.org:90/authorize"
    authApiRequest: Observable<any>
    userLoggedIn = false
    public jwt_token: string
    public googleUserDetails: string

    constructor(
        private router: Router,
        private authService: SocialAuthService,
        private http: HttpClient,
        private materialNotification: MatSnackBar
    ) {}

    checkIsUserLoggedIn() {
        const storage = localStorage.getItem("google_auth")
        const jwt_from_backend = localStorage.getItem("jwt_token")

        if (storage && jwt_from_backend) {
            this.userLoggedIn = true
        }
    }

    verifyAuthAndRedirect(backendResponse: backend_auth_response) {
        if (backendResponse.error) {
            this.router.navigateByUrl("/unauthorized").then()
        } else {
            localStorage.setItem("jwt_token", backendResponse.jwt_token)
            this.router.navigateByUrl("/notes").then()
        }
    }

    initJWTauth(data: Object) {
        const google_auth_data = JSON.stringify(data)
        const params = new HttpParams().set(
            "google_auth_data",
            google_auth_data
        )

        this.authApiRequest = this.http.get(this.API_AUTH_URL, { params })

        this.authApiRequest.subscribe({
            next: (backendResponse) =>
                this.verifyAuthAndRedirect(backendResponse),

            error: (error) => this.handleHTTPError(error),
        })
    }

    handleHTTPError(error: HttpErrorResponse) {
        const message = "The backend is down, try again later"

        this.materialNotification.open(message, "Close", {
            duration: 5000,
        })
    }

    authorize() {
        this.authService.initState.subscribe((value) => {
            // id.doc.id#1
            this.authService
                .signIn(GoogleLoginProvider.PROVIDER_ID)
                .then((data) => {
                    localStorage.setItem("google_auth", JSON.stringify(data))
                    this.initJWTauth(data)
                })
        })
    }

    signOut() {
        localStorage.removeItem("google_auth")
        localStorage.removeItem("jwt_token")
        this.router.navigateByUrl("").then()
        this.userLoggedIn = false
    }

    accessControl() {
        const storage = localStorage.getItem("google_auth")
        const jwt_from_backend = localStorage.getItem("jwt_token")

        if (storage && jwt_from_backend) {
            this.googleUserDetails = JSON.parse(storage)
            this.jwt_token = jwt_from_backend
        } else {
            this.signOut()
        }
    }
}
