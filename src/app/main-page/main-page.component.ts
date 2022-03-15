import { Component, OnInit } from "@angular/core"
import { GoogleAuthService } from "../auth/google/google-auth.service"
import { Router } from "@angular/router"
import { OnlineUpdaterService } from '../online-updater/online-updater.service'

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.sass"],
})
export class MainPageComponent implements OnInit {

    constructor(
        private router: Router,
        public googleAuth: GoogleAuthService,
        private onlineUpdater: OnlineUpdaterService,
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        if (!this.googleAuth.userLoggedIn) return
        this.onlineUpdater.schedule()
    }

    navigateToNotes() {
        this.router.navigateByUrl("/notes").then()
    }
}
