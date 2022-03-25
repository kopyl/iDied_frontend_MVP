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
            this.notes = snakeToCamelCaseArray(
                backendResponse.notes
            ) as frontendNote[]
            // this.notes.map( (note: frontendNote) => note.changesSynced = true)
            this.notes.forEach(
                (note: frontendNote, index) => {
                    this.notes[index].changesSynced = true
                }
            )
            this.activeNote = this.notes[0]
        }
    }

    changeActiveNote() {  // to be implemenyted... Just for debug
        this.testVar = !this.testVar
        this.activeNote = this.testVar ? this.notes[1] : this.notes[0]
        console.log('changing active note')
    }

    fetchNotes(): void {
        this.requests.notes.get.onSuccess = this.addNotes.bind(this)
        this.requests.notes.get.send()
    }
}
