import { Component, OnInit } from "@angular/core"
import { OnlineUpdaterService } from "@services/online-updater"
import { NavigationEnd, Router, RouterOutlet } from "@angular/router"
import { slider } from "@animations"
import { environment } from "@environment"

declare const gtag: Function // Google Analytics

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
    animations: slider,
})
export class AppComponent implements OnInit {
    constructor(
        private onlineUpdater: OnlineUpdaterService,
        public router: Router
    ) {
        this.setUpGoogleAnalytics()
    }

    setUpGoogleAnalytics(): void {

        if (!environment.production) return

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                gtag("config", "MEASUREMENT-ID", {
                    page_path: event.urlAfterRedirects,
                })
            }
        })
    }

    ngOnInit(): void {
        this.onlineUpdater.schedule()

        console.log('for test 17 May 2022')
    }

    prepareOutlet(outlet: RouterOutlet) {
        // id.doc.id#3
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData["animation"]
        )
    }
}
