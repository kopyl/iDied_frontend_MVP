import {
    Component,
    OnInit,
    OnChanges,
    Input,
    OnDestroy,
    SimpleChanges,
    Output,
    EventEmitter,
    HostListener,
    ElementRef,
} from "@angular/core"
import { Subscription, Subject, timer } from "rxjs"
import {
    scan,
    debounce,
    take,
    repeat,
    mergeAll,
    distinctUntilKeyChanged,
} from "rxjs/operators"
import { RequestsService } from "@services/requests"

import { FormGroup } from "@angular/forms"
import { FormBuilder } from "@angular/forms"

@Component({
    selector: "note",
    templateUrl: "./note.component.html",
    styleUrls: ["./note.component.sass"],
})
export class NoteComponent implements OnInit, OnChanges, OnDestroy {
    alertVisible = false
    textareaInFocus = false

    saveNotesSubscription$ = new Subscription()
    saveNotesBuffer$ = new Subject()

    form: FormGroup

    @Input() activeNote: frontendNote
    @Input() toggleFormFocus = false

    @Output() noteContentChanged = new EventEmitter()
    @Output() removeNoteEvent = new EventEmitter()
    @Output() closeNoteEvent = new EventEmitter()

    constructor(
        private readonly requests: RequestsService,
        private readonly fb: FormBuilder,
        private HTML: ElementRef
    ) {}

    updateAlert() {
        if (!this.activeNote.title && !this.activeNote.body) {
            this.alertVisible = true
        } else {
            this.alertVisible = false
        }
    }

    ngOnInit(): void {
        this.initSavingNote()

        this.form = this.fb.group({
            title: this.activeNote?.title,
            body: this.activeNote?.body,
        })

        this.form.valueChanges.subscribe((changes) => {
            if (!this.activeNote) return
            this.activeNote.editedAt = Math.floor(Date.now() / 1000)

            this.saveNotesBuffer$.next(this.activeNote)

            this.activeNote.title = changes.title
            this.activeNote.body = changes.body

            this.activeNote.changesSynced = false

            this.noteContentChanged.emit()

            this.updateAlert()
        })
    }

    ngOnChanges(changes: SimpleChanges): void {

        // of @Input

        if (!this.activeNote) return

        this.form?.setValue(
            {
                title: this.activeNote?.title,
                body: this.activeNote?.body,
            },
            { emitEvent: false }
        )

        this.updateAlert()

        const previousNote = changes["activeNote"]?.previousValue
        if (!previousNote) return
        this.saveNotesBuffer$.next(previousNote)
    }

    initSavingNote(): void {
        const saveNotesPipe$ = this.saveNotesBuffer$.pipe(
            scan<any, Array<frontendNote>>((acc, val) => {
                return [...acc, val]
            }, []),
            debounce((_) => timer(500)),
            take(1),
            mergeAll(),
            distinctUntilKeyChanged("id"),
            repeat()
        )

        this.saveNotesSubscription$ = saveNotesPipe$.subscribe(
            (activeNote: frontendNote) => {
                if (activeNote.changesSynced) return
                activeNote.changesSynced = true
                const noteToSend = { ...activeNote }
                delete noteToSend.createdAt
                delete noteToSend.changesSynced
                this.requests.notes.save.send(noteToSend)
            }
        )
    }

    ngOnDestroy(): void {
        this.saveNotesSubscription$.unsubscribe()
    }

    removeNote() {
        this.removeNoteEvent.emit()
    }

    @HostListener("document:focusin")
    log() {
        this.textareaInFocus = true
    }

    @HostListener("document:focusout")
    logFocusOut() {
        this.textareaInFocus = false
    }

    closeNote() {
        this.closeNoteEvent.emit()
    }
}
