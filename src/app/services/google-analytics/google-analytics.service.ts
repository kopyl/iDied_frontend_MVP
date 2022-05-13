import { Injectable } from "@angular/core"
import { environment } from "@environment"

declare const gtag: Function // Google Analytics

interface GoogleAnalyticsPayload {
    value: any
    [key: string]: any
}

@Injectable({
    providedIn: "root",
})
export class GoogleAnalyticsService {
    constructor() {}

    sendEvent(name: string, payload: GoogleAnalyticsPayload): void {
        if (!environment.production) return

        gtag("event", name, payload)
    }
}
