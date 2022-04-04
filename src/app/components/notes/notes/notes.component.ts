import { Component, OnInit } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { GoogleAuthService } from "@services/auth"
import { snakeToCamelCaseArray } from "@utils/transformations"
import { RequestsService } from "@services/requests"
import { ActivatedRoute, NavigationStart } from "@angular/router"
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
    notesEditing: boolean = false
    noteFromUrlId: string
    selectedNoteIndex: number

    navigatedRoute$

    @ViewChild("notesListHTML") notesListHTML: ElementRef<HTMLDivElement>

    constructor(
        public readonly googleAuth: GoogleAuthService,
        private pageTitle: Title,
        private router: Router,
        private readonly requests: RequestsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        if (!this.googleAuth.userLoggedIn) {
            this.router.navigate(["/unauthorized"])
            return
        }
        this.pageTitle.setTitle("iDied - Notes")
        this.fetchNotes()

        this.noteFromUrlId = this.router.parseUrl(
            this.router.url
        )?.root?.children["primary"]?.segments[1]?.path

        this.handleiOSnavigateBySwipeLeft()
    }

    handleiOSnavigateBySwipeLeft() {
        this.router.events.subscribe((event: any) => {
            if (event.url === "/notes") {
                this.notesEditing = false
            } else if (event.url && event.url.startsWith("/notes/")) {
                this.openMobileNote()
            }
        })
    }

    setSelectedNoteIndex() {
        if (this.noteFromUrlId) {
            this.selectedNoteIndex = this.notes.findIndex(
                (el) => el.id === this.noteFromUrlId
            )
        } else {
            this.selectedNoteIndex = this.notes.findIndex(
                (el) => el.id === this.activeNote.id
            )
        }
    }

    setActiveNote(newNote = false): void {
        this.activeNote = this.notes[0]
        if (newNote) return
        if (this.noteFromUrlId) {
            this.activeNote =
                this.notes.find((el) => el.id === this.noteFromUrlId) ??
                this.notes[0]
            this.openMobileNote()
            this.setSelectedNoteIndex()
        }
    }

    toggleFormFocus(): void {
        this.formFocused = !this.formFocused
    }

    downloadNotes(backendResponse: backend_notes_response) {
        this.addNotes(backendResponse, false)
    }

    createNoteInUI(backendResponse: backend_notes_response) {
        this.addNotes(backendResponse, true)
    }

    addNotes(backendResponse: backend_notes_response, newNote = false): void {
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

            this.setActiveNote(newNote)
            this.scrollToFirstNote()
            this.toggleFormFocus()

            if (this.notes.length === 1) {
                this.openMobileNote()
            }

            if (newNote) {
                this.router.navigate(["/notes", this.activeNote.id])
            }
        }
    }

    changeActiveNote(note: frontendNote): void {
        this.activeNote = note
        this.toggleFormFocus()
        this.openMobileNote()

        this.router.navigate(["/notes", this.activeNote.id])
    }

    fetchNotes(): void {
        this.requests.notes.get.onSuccess = this.downloadNotes.bind(this)
        this.requests.notes.get.send()
    }

    createNote(): void {
        this.requests.notes.create.onSuccess = this.createNoteInUI.bind(this)
        this.requests.notes.create.send()
    }

    removeNoteFromUI(backendResponse: backend_notes_response): void {
        if (backendResponse.error) {
            this.googleAuth.signOut()
            this.router.navigate(["/unauthorized"])
        } else {
            this.notes = this.notes.filter(
                (note: frontendNote) => note.id !== backendResponse.notes[0].id
            )
            if (this.notes.length === 0) this.createNote()
            this.scrollToFirstNote()
            this.setActiveNote()
            this.toggleFormFocus()
            this.closeNote()
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
        let selectedNoteOrder = this.selectedNoteIndex + 1 || 1
        const scrollPosotion =
            (selectedNoteOrder - 1) * 39 + (selectedNoteOrder - 1) * 5
        const scroll = () => {
            this.notesListHTML.nativeElement.scrollTo({
                top: scrollPosotion,
                behavior: "auto",
            })
        }
        setTimeout(scroll)
    }

    reSortNotes(): void {
        if (this.notesSorted()) return
        this.notes.sort((a, b) => b.editedAt - a.editedAt)
    }

    openMobileNote() {
        this.notesEditing = true
    }

    closeNote() {
        this.notesEditing = false
        this.router.navigate(["/notes"])
        this.setSelectedNoteIndex()
        this.scrollToFirstNote()
    }
}
