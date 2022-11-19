import { environment } from '@environment'
import {
    Component,
    OnInit,
    HostListener,
    Input,
    ElementRef,
    ViewChild,
} from '@angular/core'
import { popupFader, popupSlider } from '@animations'
import { IconCloseNoteComponent } from '../icons/icon-close-note/icon-close-note.component'
import { IconRevokeComponent } from '../icons/icon-revoke/icon-revoke.component'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'

import { EventEmitter } from '@angular/core'
import { Output } from '@angular/core'
import { LangService } from '@services/lang'

const shortenText = (title) => {
    return `${title.slice(0, 50)}...`
}

@Component({
    selector: 'confirm-popup',
    templateUrl: './confirm-popup.component.html',
    styleUrls: ['./confirm-popup.component.sass'],
    animations: [popupFader, popupSlider],
})
export class ConfirmPopupComponent implements OnInit {
    @Input('activeNote') activeNote: frontendNote

    @Output() confirmationPressed = new EventEmitter()

    keydowns$: Subject<KeyboardEvent> = new Subject()

    open = false
    public confirmButtonIcon
    public setLang
    public onSuccess = () => {}
    public onCancel = () => {}
    public type:
        | 'noteRemoval'
        | 'noteUnshare'
        | 'linkRevoke'
        | 'info'
        | 'pro'
        | 'contacts'
        | 'lang' = 'noteRemoval'

    public title = 'Set title'
    public body = 'Set body'
    public buttonText = 'Set button text'

    get activeNoteTitle(): string {
        const title = this.activeNote.title
        if (title.length > 50) {
            return shortenText(title)
        }
        return title
    }

    constructor(
        private html: ElementRef<HTMLDivElement>,
        private route: ActivatedRoute,
        private router: Router,
        public lang: LangService
    ) {}

    ngOnInit(): void {
        this.keydowns$
            .pipe(
                filter((e) => this.open),
                filter((e) => e.key === 'Escape')
            )
            .subscribe((e) => {
                this.open = false
            })

        this.showPaidNotification()
        this.showLoginNotification()
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        this.keydowns$.next(event)
    }

    // Implementing slide down the popup on drag

    @ViewChild('fg') fg
    firstY: number
    distance: number

    touchStart($event: TouchEvent) {
        this.firstY = $event.touches[0].clientY
    }

    touchMove($event: TouchEvent) {
        const currentY = $event.touches[0].clientY
        this.distance = currentY - this.firstY
        this.fg.nativeElement.style.top = `${this.distance}px`
    }

    touchEnd($event: TouchEvent) {
        if (this.distance > 150 || this.distance < -150) {
            this.open = false
        } else {
            this.fg.nativeElement.style.top = '0px'
        }
    }

    showLoginNotification(): void {
        const doesNeedLogin = this.route.snapshot.queryParams['needLogin']
        if (!doesNeedLogin) return

        this.type = 'info'
        this.open = true

        if (doesNeedLogin !== 'true') return

        this.title = this.lang.copy.popups.titles.loginRequired
        this.body = this.lang.copy.popups.descriptions.loginRequired
        this.buttonText = this.lang.copy.buttons.login

        this.onCancel = () => this.router.navigate([])
    }

    showPaidNotification(): void {
        const isPaid = this.route.snapshot.queryParams['paid']
        if (!isPaid) return

        this.type = 'info'
        this.open = true

        if (isPaid === 'true') {
            this.title = this.lang.copy.popups.titles.paymentSuccessful
            this.body = this.lang.copy.popups.descriptions.paymentSuccessful
            this.buttonText = this.lang.copy.buttons.iUnderstand
            this.onSuccess = () => {
                this.router.navigate(['/notes'])
            }
            this.onCancel = () => {
                this.router.navigate(['/notes'])
            }
        } else {
            this.onSuccess = () =>
                (window.location.href = `${environment.apiUrl}payment`)
            this.onCancel = () => this.router.navigate(['/notes'])
            this.title = this.lang.copy.popups.titles.paymentFailed
            this.body = this.lang.copy.popups.descriptions.paymentFailed
            this.buttonText = this.lang.copy.buttons.tryAgain
            this.confirmButtonIcon = IconRevokeComponent
        }
    }
}
