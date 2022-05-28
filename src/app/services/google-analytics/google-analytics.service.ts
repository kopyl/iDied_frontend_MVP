import { Injectable } from "@angular/core"
import { environment } from "@environment"

declare const gtag: Function // Google Analytics

interface GoogleAnalyticsPayload {
    value: any
    [key: string]: any
}

const marker = { value: true }
const makeEventArgs = (_): eventArgs => [_, marker]

type name = string
type eventArgs = [name, GoogleAnalyticsPayload]

class Events {
    static login: eventArgs = makeEventArgs("login")
    static createNote: eventArgs = makeEventArgs("create_note")
}

@Injectable({
    providedIn: "root",
})
export class GoogleAnalyticsService {
    constructor() {}

    sendEvent(args: eventArgs): void {
        if (!environment.production) return
        gtag("event", ...args)
        console.log('28may, 06:22')
    }

    setUserID(userID: string): void {
        if (!environment.production) return

        const savedUserIDInLS = localStorage.getItem("userID")
        if (savedUserIDInLS) return
        /*
        If it's saved, it's retrieved in index.html
        and sent to GA
        */
        const uid = {userID: userID}
        gtag("set", "user_properties", uid)
        localStorage.setItem("userID", userID)
    }

    trackLogin(): void {
        this.sendEvent(Events.login)
    }

    trackNoteCreation(): void {
        this.sendEvent(Events.createNote)
    }
}
