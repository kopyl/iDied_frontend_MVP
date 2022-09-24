import { Injectable } from '@angular/core'
import { environment } from '@environment'
import mixpanel from 'mixpanel-browser'

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
    static login: eventArgs = makeEventArgs('login')
    static createNote: eventArgs = makeEventArgs('create_note')
    static requestProAccount: eventArgs = makeEventArgs('pro_account_requested')
}

@Injectable({
    providedIn: 'root',
})
export class GoogleAnalyticsService {
    constructor() {}

    private options(googleAuth) {
        return {
            id: googleAuth.userId,
            avatar: googleAuth.avatarUrl,
            name: googleAuth.name,
            email: googleAuth.email,
        }
    }

    sendEvent(args: eventArgs): void {
        if (!environment.production) return
        gtag('event', ...args)
    }

    setUserID(userID: string): void {
        if (!environment.production) return

        const savedUserIDInLS = localStorage.getItem('userID')
        if (savedUserIDInLS) return // id.doc.id#6
        const uid = { userID: '#' + userID }
        gtag('set', 'user_properties', uid)
        localStorage.setItem('userID', userID)
    }

    trackLogin(queryParams, googleAuth): void {
        this.sendEvent(Events.login)
        mixpanel.track('login')
        if (queryParams['newUser']) {
            mixpanel.track('Sign up', this.options(googleAuth))
        }
    }

    trackNoteCreation(googleAuth): void {
        this.sendEvent(Events.createNote)
        mixpanel.track('Note created', this.options(googleAuth))
    }

    trackProAccountRequest(googleAuth): void {
        this.sendEvent(Events.requestProAccount)
        mixpanel.track('Pro account requested', this.options(googleAuth))
    }

    trackProAccountRequestConfirm(callback, googleAuth): void {
        mixpanel.track(
            'Pro account request confirmed',
            this.options(googleAuth),
            { send_immediately: true },
            callback
        )
    }

    trackProAccountForceRequestConfirm(callback, googleAuth): void {
        mixpanel.track(
            'Pro account force request confirmed',
            this.options(googleAuth),
            { send_immediately: true },
            callback
        )
    }

    trackOpeningNoteMobile(googleAuth): void {
        mixpanel.track('Note opened', this.options(googleAuth))
    }

    trackOpeningSharingNoteMobile(googleAuth): void {
        mixpanel.track('Sharing note opened', this.options(googleAuth))
    }

    trackClosingNoteMobile(googleAuth): void {
        mixpanel.track('Note closed', this.options(googleAuth))
    }

    trackOpeningSharing(googleAuth): void {
        mixpanel.track('Sharing opened', this.options(googleAuth))
    }

    trackClosingSharing(googleAuth): void {
        mixpanel.track('Sharing closed', this.options(googleAuth))
    }

    trackNoteRemoval(googleAuth): void {
        mixpanel.track('Note removed', this.options(googleAuth))
    }

    trackNotesLimitReached(googleAuth): void {
        mixpanel.track('Notes limit reached', this.options(googleAuth))
    }

    trackProStatusEnabled(googleAuth): void {
        mixpanel.track('Pro status enabled', this.options(googleAuth))
    }

    trackNotesLoaded(googleAuth): void {
        mixpanel.track('Notes loaded', this.options(googleAuth))
    }
}
