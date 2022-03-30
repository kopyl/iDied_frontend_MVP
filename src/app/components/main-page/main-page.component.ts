import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { GoogleAuthService } from "@services/auth"

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
    }

    navigateToNotes() {
        this.router.navigate(["/notes"])
    }
}
