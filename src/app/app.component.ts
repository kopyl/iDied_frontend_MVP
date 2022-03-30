import { Component, OnInit } from "@angular/core"
import { OnlineUpdaterService } from "@services/online-updater"
import { RouterOutlet } from "@angular/router"
import { fader, slider } from "@animations"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
    animations: slider
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
