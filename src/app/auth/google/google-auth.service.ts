import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login"
import { RequestsService } from "src/app/requests/requests.service"

@Injectable({
    providedIn: "root",
})
export class GoogleAuthService {
    public userLoggedIn = false
    public jwtToken: string = ""
    public googleUserDetails: string

    constructor(
        private router: Router,
        private authService: SocialAuthService,
        private requests: RequestsService
    ) {}

    verifyAuthAndRedirect(backendResponse: backend_auth_response) {
        if (backendResponse.error) {
            this.router.navigateByUrl("/unauthorized").then()
        } else {
            localStorage.setItem("jwt_token", backendResponse.jwt_token)
            this.router.navigateByUrl("/notes").then()
        }
    }

    initJWTauth(oauthData: SocialUser) {
        this.requests.auth.onSuccess = this.verifyAuthAndRedirect.bind(this)
        this.requests.auth.send({ oauthData })
    }

    authorize() {
        this.authService.initState.subscribe((value: boolean) => {
            // id.doc.id#1
            this.authService
                .signIn(GoogleLoginProvider.PROVIDER_ID)
                .then((data) => {
                    localStorage.setItem("google_auth", JSON.stringify(data))
                    this.initJWTauth(data)
                })
                .catch((e) => {
                    console.error("Login popup closed by user")
                })
        })
    }

    signOut(args = { redirect: true }) {
        localStorage.removeItem("google_auth")
        localStorage.removeItem("jwt_token")
        this.userLoggedIn = false
        if (!args.redirect) return
        this.router.navigateByUrl("").then()
    }

    accessControl(args = { redirect: true }) {
        const storage = localStorage.getItem("google_auth")
        const jwt_from_backend = localStorage.getItem("jwt_token")

        if (storage && jwt_from_backend) {
            this.googleUserDetails = JSON.parse(storage)
            this.jwtToken = jwt_from_backend
            this.userLoggedIn = true
        } else {
            this.signOut({ redirect: args.redirect })
        }
    }
}
