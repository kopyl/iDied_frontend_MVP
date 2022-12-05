import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ConfirmPopupComponent } from '@components/confirmation-popup'
import { RequestsService } from '@services/requests'
import { environment } from '@environment'
import { LangService } from '@services/lang'
import { GoogleAuthService } from '@services/auth'
import { GoogleAnalyticsService } from '@services/google-analytics'
import { ProStatusService } from '@services/proStatus'

@Component({
    selector: 'sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.sass'],
})
export class SharingComponent implements OnInit {
    paymentUrl = `${environment.apiUrl}payment`
    baseUrl = environment.baseUrl

    loaderVisible = false

    @Input('activeNote') activeNote: frontendNote
    @Input('confirmPopup') confirmPopup: ConfirmPopupComponent
    @Input() amountOfSharedNotes: number

    @Output() sharingCloseEvent = new EventEmitter()
    @Output() requestPro = new EventEmitter()

    constructor(
        private readonly requests: RequestsService,
        private materialNotification: MatSnackBar,
        public lang: LangService,
        public readonly googleAuth: GoogleAuthService,
        public googleAnalytics: GoogleAnalyticsService,
        private proStatusService: ProStatusService
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

    sendTgReportConfirm(): void {
        this.requests.sendTGreport.send({
            type: 'requestProDetailedConfirmedInEmailTgSharing',
            message:
                'User pressed upgrade button in email/telegram sharing view ❤️',
            userId: this.googleAuth.userId,
        })
    }

    sendProRequiredPopup(_for: 'telegram' | 'email'): void {
        if (this.proStatusService.proStatus) return
        this.confirmPopup.type = 'pro'
        this.confirmPopup.open = true
        this.confirmPopup.hideTelegramAndEmailProItem = true
        this.confirmPopup.buttonText = this.lang.copy.buttons.upgrade

        this.confirmPopup.onSuccess = () => {
            this.requests.sendTGreport.onSuccess = () => {
                this.googleAnalytics.trackProAccountRequestConfirm(() => {
                    window.location.href = this.paymentUrl
                }, this.googleAuth)
            }
            this.sendTgReportConfirm()
        }
        this.requests.sendTGreport.send({
            type: 'emailTgSharingRequest',
            message: 'user pressed on email/telegram button in sharing view',
            userId: this.googleAuth.userId,
        })

        if (_for === 'telegram')
            this.confirmPopup.title =
                this.lang.copy.popups.titles.proDetailedTelegramRequest
        if (_for === 'email')
            this.confirmPopup.title =
                this.lang.copy.popups.titles.proDetailedEmailRequest
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
        if (backendResponse.error) {
            this.loaderVisible = false
            this.notifyAboutErrorRevokingLink()
            return
        }

        const sharingToken = backendResponse.notes[0].sharing_token
        this.activeNote.sharingToken = sharingToken
        this.loaderVisible = false
        this.notifyAboutRevokedLink()
    }

    updateSharingToken(backendResponse: backend_notes_response): void {
        if (backendResponse.error) {
            this.loaderVisible = false
            return
        }
        const sharingToken = backendResponse.notes[0].sharing_token
        this.activeNote.sharingToken = sharingToken
        this.activeNote.isShared = true
        this.loaderVisible = false
    }

    shareNote() {
        if (
            this.proStatusService.proStatus === false &&
            this.amountOfSharedNotes >= 3
        ) {
            this.requestPro.emit()
            return
        }

        this.loaderVisible = true
        this.requests.notes.share.onSuccess = this.updateSharingToken.bind(this)
        this.requests.notes.share.send(this.activeNote)
    }

    notifyAboutRevokedLink(): void {
        this.materialNotification.open(
            this.lang.copy.notifications.revoked.body,
            this.lang.copy.notifications.revoked.cta,
            {
                duration: 5000,
                panelClass: ['notification'],
            }
        )
    }

    notifyAboutCopiedText() {
        this.materialNotification.open(
            this.lang.copy.notifications.copied.body,
            this.lang.copy.notifications.copied.cta,
            {
                duration: 5000,
                panelClass: ['notification'],
            }
        )
    }

    notifyAboutErrorRevokingLink() {
        this.materialNotification.open(
            this.lang.copy.notifications.errorRevoking.body,
            this.lang.copy.notifications.errorRevoking.cta,
            {
                duration: 5000,
                panelClass: ['notification'],
            }
        )
    }
}
