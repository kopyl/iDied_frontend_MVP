import { Component, OnInit } from "@angular/core"
import { GoogleAuthService } from "../login/services/google-auth/google-auth.service"
import { TelegramAuthService } from "../login/services/telegram-auth/telegram-auth.service"
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
        public telegramAuth: TelegramAuthService
    ) {}

    ngOnInit(): void {
        this.googleAuth.checkIsUserLoggedIn()
    }

    navigateToNotes() {
        this.router.navigateByUrl("/notes").then()
    }
}
