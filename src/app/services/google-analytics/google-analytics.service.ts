import { Injectable } from '@angular/core';
import { environment } from '@environment';

declare const gtag: Function; // Google Analytics

interface GoogleAnalyticsPayload {
    value: any;
    [key: string]: any;
}

const marker = { value: true };
const makeEventArgs = (_): eventArgs => [_, marker];

type name = string;
type eventArgs = [name, GoogleAnalyticsPayload];

class Events {
    static login: eventArgs = makeEventArgs('login');
    static createNote: eventArgs = makeEventArgs('create_note');
    static requestProAccount: eventArgs = makeEventArgs(
        'pro_account_requested'
    );
}

@Injectable({
    providedIn: 'root',
})
export class GoogleAnalyticsService {
    constructor() {}

    sendEvent(args: eventArgs): void {
        if (!environment.production) return;
        gtag('event', ...args);
    }

    setUserID(userID: string): void {
        if (!environment.production) return;

        const savedUserIDInLS = localStorage.getItem('userID');
        if (savedUserIDInLS) return; // id.doc.id#6
        const uid = { userID: '#' + userID };
        gtag('set', 'user_properties', uid);
        localStorage.setItem('userID', userID);
    }

    trackLogin(): void {
        this.sendEvent(Events.login);
    }

    trackNoteCreation(): void {
        this.sendEvent(Events.createNote);
    }

    trackProAccountRequest(): void {
        this.sendEvent(Events.requestProAccount);
    }
}
