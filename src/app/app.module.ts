import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

import { AngularTelegramLoginWidgetModule } from "angular-telegram-login-widget"

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

const GoogleLogingProviders = [
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
            // '79857033727-t0vldi14g42keagjar5qv59ndjs8nn43.apps.googleusercontent.com'  // idied3
            '79857033727-11tj271ajce1b51jpg4q7lljlbip2p5q.apps.googleusercontent.com'
        )
    }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotesComponent,
    UnauthorizedComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    AngularTelegramLoginWidgetModule
  ],
  providers: [
      {
        provide: 'SocialAuthServiceConfig',
        // https://www.youtube.com/watch?v=cvGdM8G4R74&ab_channel=TheSwagCoder
        useValue: {
            autoLogin: false,
            providers: GoogleLogingProviders
        } as SocialAuthServiceConfig
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
