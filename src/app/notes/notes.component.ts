import { Component, OnInit } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { GoogleAuthService } from "../auth/google/google-auth.service"
import { Observable } from "rxjs"
import { HttpErrorHandlerService } from "src/app/http-error-handler/http-error-handler.service"
import { snakeToCamelCaseArray } from "../utils/transformations"

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
    notes: Array<frontendNote> = []
    formVisible = false
    private noteApiRequest: Observable<any>
    private readonly API_NOTES_URL = "http://idied.org:90/notes"

    constructor(
        public readonly googleAuth: GoogleAuthService,
        private pageTitle: Title,
        private router: Router,
        private http: HttpClient,
        private HTTPErrorHandler: HttpErrorHandlerService
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
            this.notes =
            snakeToCamelCaseArray(backendResponse.notes) as frontendNote[]
        }
    }

    fetchNotes(): void {

        this.noteApiRequest = this.http.get(this.API_NOTES_URL)

        this.noteApiRequest.subscribe({
            next: (backendResponse: backend_notes_response) => {
                this.addNotes(backendResponse)
            },

            error: (error) => this.HTTPErrorHandler.handle(error, "notes"),
        })

    }

}
