import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { HttpErrorHandlerService } from "@services/http-error-handler"
import { GoogleAuthService } from "@services/auth"

@Injectable({
    providedIn: "root",
})
export class OnlineUpdaterService {
    private readonly URL = "http://idied.org:5001/update_last_online_timestamp"
    launched = false

    constructor(
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService,
        private readonly googleAuth: GoogleAuthService,
    ) {}

    saveLastOnline() {

        this.googleAuth.accessControl({redirect: false})
        if (!this.googleAuth.userLoggedIn) return

        const request = this.http.get(this.URL)

        request.subscribe({
            error: (error) => this.HTTPErrorHandler.handle(error, "online"),
        })
    }

    schedule() {
        if (this.launched) return
        const saveLastOnline = this.saveLastOnline
        const obj = this
        setInterval(
            (function _() {
                saveLastOnline.call(obj)
                return _
            })(),
            1000
        )
        this.launched = true
    }
}