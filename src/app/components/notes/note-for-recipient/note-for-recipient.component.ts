import { Component, OnInit } from "@angular/core"
import { RequestsService } from "@services/requests"
import { Router, ActivatedRoute } from "@angular/router"

@Component({
    selector: "app-note-for-recipient",
    templateUrl: "./note-for-recipient.component.html",
    styleUrls: ["./note-for-recipient.component.sass"],
})
export class NoteForRecipientComponent implements OnInit {
    sharingToken: string
    forbidden = true
    destroyable = false
    title: string
    body: string

    constructor(
        private readonly route: ActivatedRoute,
        private readonly requests: RequestsService
    ) {}

    ngOnInit(): void {
        this.getRequestedNoteToken()
        this.getContent()
    }

    getRequestedNoteToken() {
        const snapshot = this.route.snapshot
        this.sharingToken = snapshot.params["sharingToken"]
    }

    insertNoteIntoUI(backendResponse: backend_notes_response): void {
        this.forbidden = backendResponse.error
        if (this.forbidden) return

        const note = backendResponse.notes[0]

        console.log(backendResponse, note)

        this.title = note.title
        this.body = note.body
    }

    getContent() {
        this.requests.noteForRecipient.get.onSuccess =
            this.insertNoteIntoUI.bind(this)

        this.requests.noteForRecipient.get.send(this.sharingToken)
    }
}
