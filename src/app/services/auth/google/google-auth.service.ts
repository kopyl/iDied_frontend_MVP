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

    constructor(
        private router: Router,
        private readonly requests: RequestsService,
        private route: ActivatedRoute
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

    accessControl() {

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
