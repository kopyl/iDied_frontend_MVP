import { Component, OnInit } from "@angular/core"
import { GoogleAuthService } from "../auth/google/google-auth.service"
import { Router } from "@angular/router"

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.sass"],
})
export class MainPageComponent implements OnInit {

    constructor(
        private router: Router,
        public googleAuth: GoogleAuthService,
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        if (!this.googleAuth.userLoggedIn) return
    }

    navigateToNotes() {
        this.router.navigateByUrl("/notes").then()
    }
}
