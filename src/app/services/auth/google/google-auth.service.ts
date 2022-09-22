import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RequestsService } from '@services/requests'
import { CookieService } from 'ngx-cookie-service'
import { environment } from '@environment'
import { GoogleAnalyticsService } from '@services/google-analytics'

@Injectable({
    providedIn: 'root',
})
export class GoogleAuthService {
    public userLoggedIn = false
    public buttonLoaderVisible = false
    private _userId = ''
    private _email = ''
    private _name = ''

    public get avatarUrl(): string {
        return localStorage.getItem('avatar_url')!
    }

    public set userId(id) {
        this._userId = id
        localStorage.setItem('userId', id)
    }

    public get userId(): string {
        return this._userId || localStorage.getItem('userId') || ''
    }

    public set email(email: string) {
        this._email = email
        localStorage.setItem('email', email)
    }

    public get email(): string {
        return this._email || localStorage.getItem('email') || ''
    }

    public set name(name: string) {
        this._name = name
        localStorage.setItem('name', name)
    }

    public get name(): string {
        return this._name || localStorage.getItem('name') || ''
    }

    constructor(
        private router: Router,
        private readonly requests: RequestsService,
        private route: ActivatedRoute,
        private cookies: CookieService,
        private googleAnalytics: GoogleAnalyticsService
    ) {}

    redirectToPaymentIfRequired(): void {
        const needPayment = this.route.snapshot.queryParams['needPayment']
        if (!needPayment) return
        window.location.href = `${environment.apiUrl}payment`
    }

    authorize(params = '') {
        window.location.href = `${environment.apiUrl}login/google?${params}`
    }

    signOut() {
        this.buttonLoaderVisible = true
        this.requests.logout.onSuccess = this.signOutOnFrontend.bind(this)
        this.requests.logout.send()
    }

    signOutOnFrontend(): void {
        this.userLoggedIn = false
        this.buttonLoaderVisible = false
        localStorage.removeItem('auth')
        localStorage.removeItem('userID')
        this.router.navigate([''])
    }

    fakeAuthForIOS() {
        if (environment.baseUrl === 'http://192.168.0.101') {
            this.cookies.set(
                'jwt_token',
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.' +
                    'eyJ1c2VyX2lkIjoiMTE3MDQ1MDk5NTQ4MzcyM' +
                    'TEwNDU2IiwiZW1haWwiOiJzcGFtbW1tbTE5OT' +
                    'dAZ21haWwuY29tIn0.YGHf70g8TpN9WWYsBVl' +
                    'z3c4-e02RrT3qqzEza8Pv9_0',
                1,
                '/'
            )
            localStorage.setItem('auth', 'true')
        }
    }

    accessControl() {
        this.fakeAuthForIOS()

        this.userLoggedIn = Boolean(localStorage.getItem('auth'))
        if (this.userLoggedIn) return

        if (this.route.snapshot.queryParams['auth']) {
            this.userLoggedIn = true
            localStorage.setItem('auth', 'true')
            this.googleAnalytics.trackLogin(
                this.route.snapshot.queryParams,
                this
            )

            this.redirectToPaymentIfRequired()

            this.router.navigate(['notes'])
        }

        if (!this.userLoggedIn) {
            this.router.navigate([''])
        }
    }
}
