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

import { HttpClientModule } from "@angular/common/http"
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { MainPageComponent } from "./main-page/main-page.component"

const CLIENT_ID =
    "79857033727-11tj271ajce1b51jpg4q7lljlbip2p5q.apps.googleusercontent.com"

const GoogleLogingProviders = [
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(CLIENT_ID),
    },
]

@NgModule({
    declarations: [
        MainPageComponent,
        AppComponent,
        NotesComponent,
        UnauthorizedComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        SocialLoginModule,
        AppRoutingModule,
        HttpClientModule,
        AngularTelegramLoginWidgetModule,
    ],
    providers: [
        {
            provide: "SocialAuthServiceConfig",  // id.doc.id#2
            useValue: {
                autoLogin: false,
                providers: GoogleLogingProviders,
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
