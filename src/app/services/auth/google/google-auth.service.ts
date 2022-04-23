import { Injectable } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login"
import { RequestsService } from "@services/requests"
import { CookieService } from "ngx-cookie-service"

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
        private readonly requests: RequestsService,
        private cookies: CookieService,
        private route: ActivatedRoute
    ) {
        this.authService.authState.subscribe((data) => {
            localStorage.setItem("google_auth", JSON.stringify(data))
            this.initJWTauth(data)
        })
    }

    fakeAuthorize() {
        const fakeQleverusToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAxMDYwMDEyNjgwOTA4ODU4Mjg3IiwiZW1haWwiOiJxbGV2ZXJ1c0BnbWFpbC5jb20ifQ.Uo_Eixzl8CEScCWjtXhRDojM1nsbyp_uutY2qtbOnLk"
        localStorage.setItem("google_auth", "{}")
        localStorage.setItem("jwt_token", fakeQleverusToken)
        this.router.navigate(["/notes"])
    }

    redirectToPaymentIfRequired(): void {
        const needLogin = this.route.snapshot.queryParams["needLogin"]

        if (needLogin) {
            window.location.href = "https://idied.org/api/payment"
        }
    }

    setCookies(backendResponse): void {
        this.cookies.set(
            "jwt_token",
            backendResponse.jwt_token,
            9999999999,
            "/",
            "idied.org",
            true,
            "Strict"
        )
        this.cookies.set(
            "jwt_token",
            backendResponse.jwt_token,
            9999999999,
            "/",
            "localhost",
            true,
            "Strict"
        )
    }

    verifyAuthAndRedirect(backendResponse: backend_auth_response) {
        if (backendResponse.error) {
            this.router.navigate(["/unauthorized"])
        } else {
            localStorage.setItem("jwt_token", backendResponse.jwt_token)

            this.setCookies(backendResponse)

            this.router.navigate(["/notes"])

            this.redirectToPaymentIfRequired()
        }
    }

    initJWTauth(oauthData: SocialUser) {
        this.requests.auth.onSuccess = this.verifyAuthAndRedirect.bind(this)
        this.requests.auth.send({ oauthData })
    }

    authorize() {
        if (window.location.host === "192.168.0.101")
            return this.fakeAuthorize() // to be removed on prod
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    }

    signOut() {
        localStorage.removeItem("google_auth")
        localStorage.removeItem("jwt_token")
        this.userLoggedIn = false

        this.cookies.delete("jwt_token", "/", "idied.org", false, "None")
        this.cookies.delete("jwt_token", "/", "localhost", false, "None")
    }

    signOutAndGoToMain() {
        this.signOut()
        this.router.navigate([""])
    }

    accessControl() {
        const storage = localStorage.getItem("google_auth")
        const jwt_from_backend = localStorage.getItem("jwt_token")

        if (storage && jwt_from_backend) {
            this.googleUserDetails = JSON.parse(storage)
            this.jwtToken = jwt_from_backend
            this.userLoggedIn = true
        } else {
            this.signOut()
        }
    }
}
