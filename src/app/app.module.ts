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
import { ClipboardModule } from '@angular/cdk/clipboard';

import { ConfirmPopupComponent } from '@components/confirmation-popup';

import { UnauthorizedComponent } from "@components/unauthorized"
import { NotFoundComponent } from "@components/not-found"
import { MainPageComponent } from "@components/main-page"

import { NotificationComponent } from "@components/notification"
import { HighlightComponent } from "@components/notification/highlight"
import { NoteComponent } from "@components/notes/note"
import { LoaderComponent } from './components/loader/loader.component';

import { FormFocusAndHeightAdjustmentDirective } from "@directives/form-focus-and-height-adjustment";
import { FixTextAreaTitleSizeOnDocumentResizeDirective } from '@directives/fix-text-area-size-on-document-resize'

import { IconArrowRightComponent } from './components/icons/icon-arrow-right/icon-arrow-right.component';
import { IconNotesComponent } from './components/icons/icon-notes/icon-notes.component';
import { IconGoogleComponent } from './components/icons/icon-google/icon-google.component';
import { IconSignOutComponent } from './components/icons/icon-sign-out/icon-sign-out.component';
import { IconLogoComponent } from './components/icons/icon-logo/icon-logo.component';
import { IconShareComponent } from './components/icons/icon-share/icon-share.component';
import { IconDeleteComponent } from './components/icons/icon-delete/icon-delete.component';
import { IconHideKeyboardComponent } from './components/icons/icon-hide-keyboard/icon-hide-keyboard.component';
import { IconCloseNoteComponent } from './components/icons/icon-close-note/icon-close-note.component';
import { LogoMobileComponent } from './components/icons/logo-mobile/logo-mobile.component';
import { PersistentAlertComponent } from './components/persistent-alert/persistent-alert/persistent-alert.component';
import { IconWarningComponent } from './components/icons/icon-warning/icon-warning.component';
import { SharingComponent } from './components/sharing/sharing.component';
import { ShareGlobeComponent } from './components/icons/share-globe/share-globe.component';
import { IconRevokeComponent } from './components/icons/icon-revoke/icon-revoke.component';
import { IconCopyComponent } from './components/icons/icon-copy/icon-copy.component';


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
        IconLogoComponent,
        IconShareComponent,
        IconDeleteComponent,
        IconHideKeyboardComponent,
        IconCloseNoteComponent,
        LogoMobileComponent,
        PersistentAlertComponent,
        IconWarningComponent,
        FixTextAreaTitleSizeOnDocumentResizeDirective,
        ConfirmPopupComponent,
        LoaderComponent,
        SharingComponent,
        ShareGlobeComponent,
        IconRevokeComponent,
        IconCopyComponent,
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
        BrowserAnimationsModule,
        ClipboardModule
    ],
    providers: [GoogleLogingProvider, authInterceptorProvider],
    bootstrap: [AppComponent],
})
export class AppModule {}
