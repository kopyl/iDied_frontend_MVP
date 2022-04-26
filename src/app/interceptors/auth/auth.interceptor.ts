
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

        const modifiedRequest = request.clone(
            {
                withCredentials: true,
            }
        )
        return next.handle(modifiedRequest)
    }
}
