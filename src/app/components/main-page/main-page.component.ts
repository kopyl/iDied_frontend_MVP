import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { GoogleAuthService } from "@services/auth"

import { SocialAuthService } from "angularx-social-login"
import { GoogleLoginProvider } from "angularx-social-login"

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.sass"],
})
export class MainPageComponent implements OnInit {
    constructor(
        private router: Router,
        public googleAuth: GoogleAuthService,

        public authService: SocialAuthService
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
        this.authService.authState.subscribe((user) => {
            // do something with user

        })
    }
}
