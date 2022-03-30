import { Component, OnInit } from "@angular/core"
import { OnlineUpdaterService } from "@services/online-updater"
import { RouterOutlet } from "@angular/router"
import { fader } from "@animations/note-item"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
    animations: [fader]
})
export class AppComponent implements OnInit {
    constructor(
        private onlineUpdater: OnlineUpdaterService,
    ) {}

    ngOnInit(): void {
        this.onlineUpdater.schedule()
    }

    prepareOutlet(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    }
}
