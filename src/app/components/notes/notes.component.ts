import { Component, OnInit } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { GoogleAuthService } from "@services/auth"
import { snakeToCamelCaseArray } from "@utils/transformations"
import { RequestsService } from "@services/requests"

import { ViewChild } from "@angular/core"

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

    @ViewChild("notesList") notesList

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

    setActiveNote(): void {
        this.activeNote = this.notes[0]
    }

    addNotes(backendResponse: backend_notes_response): void {
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

            this.setActiveNote()
            this.scrollToFirstNote()
        }
    }

    changeActiveNote(note: frontendNote): void {
        this.activeNote = note
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

    notesSorted(): boolean {
        if (this.activeNote.id === this.notes[0].id) return true
        return false
    }

    scrollToFirstNote(): void {
        console.log(this.notesList)
        this.notesList.nativeElement
        .scrollTo({top: 0, behavior: 'smooth'});
    }

    reSortNotes(): void {
        if ( this.notesSorted() ) return

        this.notes.sort(
            (a, b) => b.editedAt - a.editedAt
        )

        this.scrollToFirstNote()
    }

}
