import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GoogleAuthService {

    readonly API_AUTH_URL = 'http://localhost:90/authorize'

    constructor(
        private router: Router,
        private authService: SocialAuthService,
        private http: HttpClient
    ) { }




    authApiRequest: Observable<any>


    ngOnInit(): void {}


    saveJWTtoken(backendResponse: backend_auth_response) {
        const jwt_token = backendResponse.jwt_token
        const jwt_token_json = JSON.stringify(jwt_token)
        localStorage.setItem('jwt_token', jwt_token_json)
    }


    verifyAuthAndRedirect(backendResponse: backend_auth_response) {
        if (backendResponse.error) {
            this.router.navigateByUrl('/unauthorized').then()
            this.saveJWTtoken(backendResponse)
        } else {
            localStorage.setItem('jwt_token', JSON.stringify(backendResponse.jwt_token))
            this.router.navigateByUrl('/notes').then()
        }
    }


    initJWTauth(data: Object) {
        const google_auth_data = JSON.stringify(data)
        const params = new HttpParams().set('google_auth_data', google_auth_data)

        this.authApiRequest = this.http.get( this.API_AUTH_URL, { params } )
        this.authApiRequest.subscribe(
                backendResponse => this.verifyAuthAndRedirect(backendResponse)
        )
    }


    signInHandler() {
        this.authService.initState.subscribe(value => {
        // https://github.com/abacritt/angularx-social-login/issues/280#issuecomment-736580187
                this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
                .then(
                    data => {
                        localStorage.setItem('google_auth', JSON.stringify(data))
                        this.initJWTauth(data)
                    }
                )
        })
    }


}
