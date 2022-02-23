import { Component, OnInit } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Title } from "@angular/platform-browser"
import { GoogleAuthService } from "../auth/google/google-auth.service"

// import { fromEvent, interval } from "rxjs"
// import { debounce } from "rxjs/operators"

// const keydowns = fromEvent(document, "keydown")
// const result = keydowns.pipe(debounce((i) => interval(1000)))
// result.subscribe((x) => uploadNotesToServer())

@Component({
    selector: "app-notes",
    templateUrl: "./notes.component.html",
    styleUrls: ["./notes.component.sass"],
})
export class NotesComponent implements OnInit {
    notes: Array<any> = []
    formVisible = false

    constructor(
        public readonly googleAuth: GoogleAuthService,
        private pageTitle: Title,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        this.pageTitle.setTitle("iDied - Notes")
        this.getNotes()
    }

    addNote(): void {}

    getNotes(): void {
        this.fetchNotes()
    }

    fetchNotes(): void {
        this.notes.push("Note for my father")
        this.notes.push("Note for my mother")
    }
}
