import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { OnlineUpdaterService } from "src/app/online-updater/online-updater.service"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private onlineUpdater: OnlineUpdaterService
    ) {}

    ngOnInit(): void {
        this.onlineUpdater.schedule()
    }
}
