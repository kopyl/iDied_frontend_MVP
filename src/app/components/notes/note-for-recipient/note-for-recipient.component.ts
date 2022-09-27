import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core'
import { RequestsService } from '@services/requests'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { LangService } from '@services/lang'
import { ConfirmPopupComponent } from '@components/confirmation-popup'

@Component({
    selector: 'app-note-for-recipient',
    templateUrl: './note-for-recipient.component.html',
    styleUrls: ['./note-for-recipient.component.sass'],
})
export class NoteForRecipientComponent implements OnInit, AfterViewInit {
    @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent

    sharingToken: string
    forbidden = false
    destroyable = false
    title: string
    body: string
    loading = true

    headerHidden = false

    constructor(
        private readonly route: ActivatedRoute,
        private readonly requests: RequestsService,
        private pageTitle: Title,
        public lang: LangService
    ) {}

    ngOnInit(): void {
        this.getRequestedNoteToken()
        this.getContent()
        this.pageTitle.setTitle('iDied - Public Note')
    }

    ngAfterViewInit(): void {
        this.lang.confirmPopup = this.confirmPopup
        console.log(this.lang.confirmPopup, this.confirmPopup)
    }

    getRequestedNoteToken() {
        const snapshot = this.route.snapshot
        this.sharingToken = snapshot.params['sharingToken']
    }

    insertNoteIntoUI(backendResponse: backend_notes_response): void {
        this.forbidden = backendResponse.error
        if (this.forbidden) {
            this.loading = false
            return
        }

        const note = backendResponse.notes[0]

        this.title = note.title
        this.body = note.body
        this.loading = false
    }

    getContent() {
        this.loading = true
        this.requests.noteForRecipient.get.onSuccess =
            this.insertNoteIntoUI.bind(this)

        this.requests.noteForRecipient.get.send(this.sharingToken)
    }

    onScroll(event) {
        if (this.forbidden) return
        this.headerHidden = false
        if (event.target.scrollTop > 20) {
            this.headerHidden = true
        }
    }

    @ViewChild('content') content: ElementRef

    onWheel(event): void {
        if (
            !event.target.classList.contains('container') &&
            event.target.tagName !== 'HEADER'
        ) {
            return
        }
        this.content.nativeElement.scrollTop += event.deltaY / 2
    }
}
