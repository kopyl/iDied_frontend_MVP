import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ConfirmPopupComponent } from '@components/confirmation-popup'
import { RequestsService } from '@services/requests'
import { environment } from '@environment'
import { LangService } from '@services/lang'

@Component({
    selector: 'sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.sass'],
})
export class SharingComponent implements OnInit {
    baseUrl = environment.baseUrl

    loaderVisible = false

    @Input('activeNote') activeNote: frontendNote
    @Input('confirmPopup') confirmPopup: ConfirmPopupComponent

    @Output() sharingCloseEvent = new EventEmitter()

    constructor(
        private readonly requests: RequestsService,
        private materialNotification: MatSnackBar,
        public lang: LangService
    ) {}

    get sharingLink(): string {
        return `${this.baseUrl}/n/${this.activeNote.sharingToken}`
    }

    closeSharingWindow(): void {
        this.sharingCloseEvent.emit()
    }

    ngOnInit(): void {}

    copyLink(): void {
        const link = this.sharingLink
        // this.clipboard.c
        // await navigator.clipboard.writeText(link)
        // copy to clipboard
        // document.execCommand("copy")
    }

    sendUnsharingConfirmation(): void {
        this.confirmPopup.type = 'noteUnshare'
        this.confirmPopup.open = true
        this.confirmPopup.onSuccess = this.unshare.bind(this)
    }

    unshare() {
        this.requests.notes.unshare.onSuccess =
            this.removeSharingToken.bind(this)
        this.loaderVisible = true
        this.requests.notes.unshare.send(this.activeNote)
    }

    removeSharingToken(): void {
        this.activeNote.sharingToken = ''
        this.activeNote.isShared = false
        this.loaderVisible = false
        this.sharingCloseEvent.emit()
    }

    sendRevokingConfirmation(): void {
        this.confirmPopup.type = 'linkRevoke'
        this.confirmPopup.open = true
        this.confirmPopup.onSuccess = this.revoke.bind(this)
    }

    revoke(): void {
        this.requests.notes.revoke.onSuccess =
            this.revokeSharingToken.bind(this)
        this.loaderVisible = true
        this.requests.notes.revoke.send(this.activeNote)
    }

    revokeSharingToken(backendResponse: backend_notes_response): void {
        const sharingToken = backendResponse.notes[0].sharing_token
        this.activeNote.sharingToken = sharingToken
        this.loaderVisible = false
        this.notifyAboutRevokedLink()
    }

    notifyAboutRevokedLink(): void {
        this.materialNotification.open(
            this.lang.copy.notifications.revoked.body,
            this.lang.copy.notifications.revoked.cta, {
            duration: 5000,
            panelClass: ['notification'],
        })
    }

    notifyAboutCopiedText() {
        console.log('copied')

        this.materialNotification.open(
            this.lang.copy.notifications.copied.body,
            this.lang.copy.notifications.copied.cta,
            {
                duration: 5000,
                panelClass: ['notification'],
            }
        )
    }
}
