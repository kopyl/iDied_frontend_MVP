import { Component, OnInit } from "@angular/core"
import { GoogleAuthService } from "../auth/google/google-auth.service"
import { Title } from "@angular/platform-browser"

@Component({
    selector: "app-notes",
    templateUrl: "./notes.component.html",
    styleUrls: ["./notes.component.sass"],
})
export class NotesComponent implements OnInit {
    constructor(
        public readonly googleAuth: GoogleAuthService,
        private pageTitle: Title
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        this.pageTitle.setTitle("iDied - Notes")
    }
}
