import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { AuthInterceptor } from "@interceptors/auth"
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
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { UnauthorizedComponent } from "@components/unauthorized"
import { NotFoundComponent } from "@components/not-found"
import { MainPageComponent } from "@components/main-page"

import { NotificationComponent } from "@components/notification"
import { HighlightComponent } from "@components/notification/highlight"
import { NoteComponent } from "@components/notes/note"

import { FormFocusAndHeightAdjustmentDirective } from "@directives/form-focus-and-height-adjustment";

import { IconArrowRightComponent } from './components/icons/icon-arrow-right/icon-arrow-right.component';
import { IconNotesComponent } from './components/icons/icon-notes/icon-notes.component';
import { IconGoogleComponent } from './components/icons/icon-google/icon-google.component';
import { IconSignOutComponent } from './components/icons/icon-sign-out/icon-sign-out.component'


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
        NotificationComponent,
        HighlightComponent,
        NoteComponent,
        FormFocusAndHeightAdjustmentDirective,
        IconArrowRightComponent,
        IconNotesComponent,
        IconGoogleComponent,
        IconSignOutComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        SocialLoginModule,
        AppRoutingModule,
        HttpClientModule,
        AngularTelegramLoginWidgetModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [GoogleLogingProvider, authInterceptorProvider],
    bootstrap: [AppComponent],
})
export class AppModule {}
