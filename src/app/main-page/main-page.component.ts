import { Component, OnInit } from "@angular/core"
import { GoogleAuthService } from "../auth/google/google-auth.service"
import { Router } from "@angular/router"

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.sass"],
})
export class MainPageComponent implements OnInit {
    public jwt_token = ""
    public userLoggedIn = false

    constructor(
        private router: Router,
        public googleAuth: GoogleAuthService,
    ) {}

    ngOnInit(): void {
        this.googleAuth.checkIsUserLoggedIn()
    }

    navigateToNotes() {
        this.router.navigateByUrl("/notes").then()
    }
}
