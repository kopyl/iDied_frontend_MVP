import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { GoogleAuthService } from "./auth/google/google-auth.service"
import { TelegramAuthService } from "./auth/telegram/telegram-auth.service"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    constructor(private router: Router) {}
}
