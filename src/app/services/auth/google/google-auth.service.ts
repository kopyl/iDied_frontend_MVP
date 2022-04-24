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
    public jwtToken: string = ""

    constructor(
        private router: Router,
        private readonly requests: RequestsService,
        private cookies: CookieService,
        private route: ActivatedRoute
    ) {}

    // redirectToPaymentIfRequired(): void {
    //     const needLogin = this.route.snapshot.queryParams["needLogin"]

    //     if (needLogin) {
    //         window.location.href = "https://idied.org/api/payment"
    //     }
    // }

    authorize() {
        window.location.href = `${environment.apiUrl}login/google`;
    }

    goToMain(): void {
        this.router.navigate([""])
    }

    signOut() {
        this.userLoggedIn = false
        this.requests.logout.onSuccess = this.goToMain.bind(this)
        this.requests.logout.send()
    }

    accessControl() {
        const jwt_from_cookies = this.cookies.get('jwt_token')
        this.jwtToken = jwt_from_cookies
        if (jwt_from_cookies) {
            this.jwtToken = jwt_from_cookies
            this.userLoggedIn = true
        } else {
            this.signOut()
        }
    }
}
