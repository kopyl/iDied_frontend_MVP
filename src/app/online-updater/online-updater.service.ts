import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { HttpErrorHandlerService } from "src/app/http-error-handler/http-error-handler.service"
import { GoogleAuthService } from "../auth/google/google-auth.service"

@Injectable({
    providedIn: "root",
})
export class OnlineUpdaterService {
    URL = "http://idied.org:90/update_last_online_timestamp"
    launched = false

    constructor(
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService,
        private readonly googleAuth: GoogleAuthService,
    ) {}

    saveLastOnline() {

        this.googleAuth.accessControl()
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
