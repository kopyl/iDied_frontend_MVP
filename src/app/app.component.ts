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
import mixpanel from 'mixpanel-browser'
import { GoogleAuthService } from '@services/auth'

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
        public lang: LangService,
        private readonly googleAuth: GoogleAuthService
    ) {
        this.setUpGoogleAnalytics()
        this.setUpMixpanel()
    }

    setUpMixpanel(): void {
        mixpanel.init('de0d618a3b71d00d234cc70a58e7883d', {
            debug: !environment.production,
            loaded: (mixpanel) => {
                mixpanel.people.set({
                    mixpanel_id: mixpanel.get_property('user_id'),
                })
            },
        })
    }

    setUpGoogleAnalytics(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                mixpanel.track('Page view', {
                    id: this.googleAuth.userId,
                    avatar: this.googleAuth.avatarUrl,
                    name: this.googleAuth.name,
                    email: this.googleAuth.email,
                })
                if (this.googleAuth.userId) {
                    mixpanel.people.set({
                        id: this.googleAuth.userId,
                        $name: this.googleAuth.name,
                        $email: this.googleAuth.email,
                        $avatar: this.googleAuth.avatarUrl,
                        name: this.googleAuth.name,
                        email: this.googleAuth.email,
                    })
                    mixpanel.identify(this.googleAuth.userId)
                }

                if (!environment.production) return
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
