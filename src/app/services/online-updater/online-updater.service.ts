import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { GoogleAuthService } from '@services/auth'
import { RequestsService } from '@services/requests'

@Injectable({
    providedIn: 'root',
})
export class OnlineUpdaterService {
    launched = false

    constructor(
        private readonly googleAuth: GoogleAuthService,
        private readonly requests: RequestsService,
        private router: Router
    ) {}

    processErrors(backendResponse: backend_auth_response): void {
        if (backendResponse?.error) {
            this.googleAuth.signOut()
        }
    }

    saveLastOnline() {
        if (!this.googleAuth.userLoggedIn) return
        this.requests.online.onSuccess = this.processErrors.bind(this)
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
