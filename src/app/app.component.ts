import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { GoogleAuthService } from "./login/services/google-auth/google-auth.service"
import { TelegramAuthService } from "./login/services/telegram-auth/telegram-auth.service"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    constructor(private router: Router) {}
}
