import { Injectable } from "@angular/core"
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http"
import { Observable } from "rxjs"
import { GoogleAuthService } from "@services/auth"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private readonly googleAuth: GoogleAuthService,
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const headers = request.headers.set(
            "jwt_token",
            this.googleAuth.jwtToken
        )
        const modifiedRequest = request.clone(
            {
                headers: headers
            }
        )

        return next.handle(modifiedRequest)
    }
}
