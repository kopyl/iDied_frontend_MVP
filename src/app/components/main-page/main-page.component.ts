import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { GoogleAuthService } from "@services/auth"
import { buttonSliderNotes, buttonSlider, logoutButtonSlider } from "@animations"
import { Title } from "@angular/platform-browser"

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.sass"],
    animations: [buttonSliderNotes, buttonSlider, logoutButtonSlider],
})
export class MainPageComponent implements OnInit {
    constructor(
        private router: Router,
        public googleAuth: GoogleAuthService,
        private pageTitle: Title
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        this.pageTitle.setTitle("After-death notes")
    }
}
