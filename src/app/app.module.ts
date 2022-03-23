import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { AuthInterceptor } from "./interceptors/auth/auth.interceptor"
import {
    GoogleLoginProvider,
    SocialLoginModule,
    SocialAuthServiceConfig,
} from "angularx-social-login"

import { AngularTelegramLoginWidgetModule } from "angular-telegram-login-widget"

import { AppComponent } from "./app.component"
import { NotesComponent } from "@components/notes"
import { AppRoutingModule } from "./app-routing.module"

import { MatSnackBarModule } from "@angular/material/snack-bar"

import { HttpClientModule } from "@angular/common/http"

import { UnauthorizedComponent } from "@components/unauthorized"
import { NotFoundComponent } from "@components/not-found"
import { MainPageComponent } from "@components/main-page"

import { NoteFormComponent } from "@components/notes/note-form"
import { NoteItemComponent } from "@components/notes/note-item"

import { NotificationComponent } from "@components/notification"
import { HighlightComponent } from "@components/notification/highlight"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"

const CLIENT_ID =
    "79857033727-11tj271ajce1b51jpg4q7lljlbip2p5q.apps.googleusercontent.com"

const GoogleLogingProviders = [
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(CLIENT_ID),
    },
]

const GoogleLogingProvider = {
    provide: "SocialAuthServiceConfig", // id.doc.id#2
    useValue: {
        autoLogin: false,
        providers: GoogleLogingProviders,
    } as SocialAuthServiceConfig,
}

const authInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}

@NgModule({
    declarations: [
        MainPageComponent,
        AppComponent,
        NotesComponent,
        UnauthorizedComponent,
        NotFoundComponent,
        NoteFormComponent,
        NoteItemComponent,
        NotificationComponent,
        HighlightComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        SocialLoginModule,
        AppRoutingModule,
        HttpClientModule,
        AngularTelegramLoginWidgetModule,
        NoopAnimationsModule,
        MatSnackBarModule,
    ],
    providers: [GoogleLogingProvider, authInterceptorProvider],
    bootstrap: [AppComponent],
})
export class AppModule {}
