import { Injectable } from "@angular/core"
import { GoogleAuthService } from "@services/auth"
import { RequestsService } from "@services/requests"

@Injectable({
    providedIn: "root",
})
export class OnlineUpdaterService {
    launched = false

    constructor(
        private readonly googleAuth: GoogleAuthService,
        private readonly requests: RequestsService
    ) {}

    saveLastOnline() {
        if (!this.googleAuth.userLoggedIn) return
        this.requests.online.send()
    }

    schedule() {
        if (this.launched) return
        const saveLastOnline = this.saveLastOnline.bind(this)
        setInterval(
            (function _() {
                saveLastOnline()
                return _
            })(),
            1000
        )
        this.launched = true
    }
}
