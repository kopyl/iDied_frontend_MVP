import { Component, OnInit } from "@angular/core"
import { OnlineUpdaterService } from "@services/online-updater"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent implements OnInit {
    constructor(
        private onlineUpdater: OnlineUpdaterService,
    ) {}

    ngOnInit(): void {
        this.onlineUpdater.schedule()
    }
}
