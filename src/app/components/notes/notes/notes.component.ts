import { Component, OnInit } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { GoogleAuthService } from "@services/auth"
import { snakeToCamelCaseArray } from "@utils/transformations"
import { RequestsService } from "@services/requests"

import { ViewChild, ElementRef } from "@angular/core"

import { noteItem } from "@animations"

@Component({
    selector: "app-notes",
    templateUrl: "./notes.component.html",
    styleUrls: ["./notes.component.sass"],
    animations: noteItem,
})
export class NotesComponent implements OnInit {
    notes: Array<frontendNote> = []
    activeNote: frontendNote
    formFocused: boolean

    @ViewChild("notesListHTML") notesListHTML: ElementRef<HTMLDivElement>

    constructor(
        public readonly googleAuth: GoogleAuthService,
        private pageTitle: Title,
        private router: Router,
        private readonly requests: RequestsService
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        if (!this.googleAuth.userLoggedIn) {
            this.router.navigate(["/unauthorized"])
            return
        }
        this.pageTitle.setTitle("iDied - Notes")
        this.fetchNotes()
    }

    setActiveNote(): void {
        this.activeNote = this.notes[0]
    }

    toggleFormFocus(): void {
        this.formFocused = !this.formFocused
    }

    addNotes(backendResponse: backend_notes_response): void {
        if (backendResponse.error) {
            this.googleAuth.signOut()
            this.router.navigate(["/unauthorized"])
        } else {
            this.notes.unshift(
                ...(snakeToCamelCaseArray(
                    backendResponse.notes
                ) as frontendNote[])
            )
            this.notes.forEach((note: frontendNote) => {
                note.changesSynced = true
            })

            this.setActiveNote()
            this.scrollToFirstNote()
            this.toggleFormFocus()
        }
    }

    changeActiveNote(note: frontendNote): void {
        this.activeNote = note
        this.toggleFormFocus()
    }

    fetchNotes(): void {
        this.requests.notes.get.onSuccess = this.addNotes.bind(this)
        this.requests.notes.get.send()
    }

    createNote(): void {
        this.requests.notes.create.onSuccess = this.addNotes.bind(this)
        this.requests.notes.create.send()
    }

    removeNoteFromUI(backendResponse: backend_notes_response): void {
        console.log(backendResponse)
        if (backendResponse.error) {
            this.googleAuth.signOut()
            this.router.navigate(["/unauthorized"])
        } else {
            this.notes = this.notes.filter(
                (note: frontendNote) => note.id !== backendResponse.notes[0].id
            )
            if (this.notes.length === 0) this.createNote()
            this.setActiveNote()
            this.scrollToFirstNote()
            this.toggleFormFocus()
        }
    }

    removeNote(): void {
        this.requests.notes.remove.onSuccess = this.removeNoteFromUI.bind(this)
        this.requests.notes.remove.send(this.activeNote)
    }

    notesSorted(): boolean {
        if (this.activeNote.id === this.notes[0].id) return true
        return false
    }

    scrollToFirstNote(): void {
        if (this.notesSorted()) return
        this.notesListHTML.nativeElement.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    reSortNotes(): void {
        if (this.notesSorted()) return
        this.notes.sort((a, b) => b.editedAt - a.editedAt)
    }
}
