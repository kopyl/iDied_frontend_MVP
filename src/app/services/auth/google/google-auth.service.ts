import { Injectable } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { RequestsService } from "@services/requests"
import { CookieService } from "ngx-cookie-service"
import { environment } from "@environment"

@Injectable({
    providedIn: "root",
})
export class GoogleAuthService {
    public userLoggedIn = false

    public get avatarUrl(): string {
        return localStorage.getItem("avatar_url")!
    }

    constructor(
        private router: Router,
        private readonly requests: RequestsService,
        private route: ActivatedRoute,
        private cookies: CookieService
    ) {}

    redirectToPaymentIfRequired(): void {
        const needPayment = this.route.snapshot.queryParams["needPayment"]
        if (!needPayment) return
        window.location.href = `${environment.apiUrl}payment`
    }

    authorize(params="") {
        window.location.href = `${environment.apiUrl}login/google?${params}`
    }

    signOut() {
        this.requests.logout.onSuccess = this.signOutOnFrontend.bind(this)
        this.requests.logout.send()
    }

    signOutOnFrontend(): void {
        this.userLoggedIn = false
        localStorage.removeItem("auth")
        this.router.navigate([""])
    }

    fakeAuthForIOS() {
        if (environment.baseUrl === "http://192.168.0.101") {
            this.cookies.set(
                "jwt_token",
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9." +
                "eyJ1c2VyX2lkIjoiMTE3MDQ1MDk5NTQ4MzcyM" +
                "TEwNDU2IiwiZW1haWwiOiJzcGFtbW1tbTE5OT" +
                "dAZ21haWwuY29tIn0.YGHf70g8TpN9WWYsBVl" +
                "z3c4-e02RrT3qqzEza8Pv9_0",
                1, '/')
            localStorage.setItem("auth", "true")
        }
    }

    accessControl() {

        this.fakeAuthForIOS()

        this.userLoggedIn = Boolean(localStorage.getItem("auth"))
        if (this.userLoggedIn) return

        if (this.route.snapshot.queryParams["auth"]) {
            this.userLoggedIn = true
            localStorage.setItem("auth", "true")

            this.redirectToPaymentIfRequired()

            this.router.navigate(["notes"])
        }

        if (!this.userLoggedIn) {
            this.router.navigate([""])
        }
    }

}
