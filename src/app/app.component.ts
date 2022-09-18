import { Component, OnInit } from '@angular/core'
import { OnlineUpdaterService } from '@services/online-updater'
import {
    NavigationEnd,
    Router,
    RouterOutlet,
    ActivatedRoute,
} from '@angular/router'
import { slider } from '@animations'
import { environment } from '@environment'
import { LangService } from '@services/lang'

declare const gtag: Function // Google Analytics

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    animations: slider,
})
export class AppComponent implements OnInit {
    constructor(
        private onlineUpdater: OnlineUpdaterService,
        public router: Router,
        private route: ActivatedRoute,
        public lang: LangService
    ) {
        this.setUpGoogleAnalytics()
    }

    setUpGoogleAnalytics(): void {
        if (!environment.production) return

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'G-X9BGV3FKZ8', {
                    page_path: event.urlAfterRedirects,
                })
            }
        })
    }

    setLanguage() {
        this.route.queryParams.subscribe((params) => {
            this.lang.lang = params['lang']
        })
    }

    ngOnInit(): void {
        this.onlineUpdater.schedule()
        this.setLanguage()
    }

    prepareOutlet(outlet: RouterOutlet) {
        // id.doc.id#3
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData['animation']
        )
    }
}
