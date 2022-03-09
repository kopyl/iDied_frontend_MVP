import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import {
    GoogleLoginProvider,
    SocialLoginModule,
    SocialAuthServiceConfig,
} from "angularx-social-login"

import { AngularTelegramLoginWidgetModule } from "angular-telegram-login-widget"

import { AppComponent } from "./app.component"
import { NotesComponent } from "./notes/notes.component"
import { AppRoutingModule } from "./app-routing.module"

import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HttpClientModule } from "@angular/common/http"

import { UnauthorizedComponent } from "./unauthorized/unauthorized.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { MainPageComponent } from "./main-page/main-page.component"

import { NoteFormComponent } from "./notes/note-form/note-form.component"
import { NoteItemComponent } from "./notes/note-item/note-item.component"

import { NotificationComponent } from "./notification/notification.component"
import { HighlightComponent } from "./notification/highlight/highlight.component";
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

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
    providers: [
        GoogleLogingProvider
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
