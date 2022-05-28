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

    setUserID(userID: string): void {
        if (!environment.production) return

        const savedUserIDInLS = localStorage.getItem("userID")
        if (savedUserIDInLS) return
        /*
        If it's saved, it's retrieved in index.html
        and sent to GA
        */
        gtag("set", { userID: userID })
    }
}
