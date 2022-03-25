import { Component, OnInit } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { GoogleAuthService } from "@services/auth"
import { snakeToCamelCaseArray } from "@utils/transformations"
import { RequestsService } from "@services/requests"

@Component({
    selector: "app-notes",
    templateUrl: "./notes.component.html",
    styleUrls: ["./notes.component.sass"],
})
export class NotesComponent implements OnInit {
    notes: Array<frontendNote> = []
    formVisible = false
    activeNote: frontendNote
    toggleFormFocus: boolean

    testVar = false

    constructor(
        public readonly googleAuth: GoogleAuthService,
        private pageTitle: Title,
        private router: Router,
        private readonly requests: RequestsService
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        if (!this.googleAuth.userLoggedIn) return
        this.pageTitle.setTitle("iDied - Notes")
        this.fetchNotes()
    }

    addNotes(backendResponse: backend_notes_response) {
        if (backendResponse.error) {
            this.googleAuth.signOut()
            this.router.navigateByUrl("/unauthorized").then()
        } else {
            this.notes.unshift(...snakeToCamelCaseArray(
                backendResponse.notes
            ) as frontendNote[]
            )
            this.notes.forEach((note: frontendNote, index) => {
                this.notes[index].changesSynced = true
            })
            this.activeNote = this.notes[0]
        }
    }

    changeActiveNote() {
        // to be implemenyted... Just for debug
        console.log("NOT changing active note")
    }

    fetchNotes(): void {
        this.requests.notes.get.onSuccess = this.addNotes.bind(this)
        this.requests.notes.get.send()
    }

    createNote(): void {
        console.log("Creating new note")
        // this.toggleFormFocus = !this.toggleFormFocus
        this.requests.notes.create.onSuccess = this.addNotes.bind(this)
        this.requests.notes.create.send()
    }
}
