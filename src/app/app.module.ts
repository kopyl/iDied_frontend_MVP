import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from '@interceptors/auth'

import { AngularTelegramLoginWidgetModule } from 'angular-telegram-login-widget'

import { AppComponent } from './app.component'
import { NotesComponent } from '@components/notes'
import { AppRoutingModule } from './app-routing.module'

import { MatSnackBarModule } from '@angular/material/snack-bar'

import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ClipboardModule } from '@angular/cdk/clipboard'

import { ConfirmPopupComponent } from '@components/confirmation-popup'

import { UnauthorizedComponent } from '@components/unauthorized'
import { NotFoundComponent } from '@components/not-found'
import { MainPageComponent } from '@components/main-page'

import { NotificationComponent } from '@components/notification'
import { HighlightComponent } from '@components/notification/highlight'
import { NoteComponent } from '@components/notes/note'
import { LoaderComponent } from './components/loader/loader.component'
import { NoteForRecipientComponent } from '@components/notes/note-for-recipient'
import { TooltipComponent } from './components/tooltip/tooltip.component'

import { FormFocusAndHeightAdjustmentDirective } from '@directives/form-focus-and-height-adjustment'
import { FixTextAreaTitleSizeOnDocumentResizeDirective } from '@directives/fix-text-area-size-on-document-resize'
import { StopPropagationOnMobileDirective } from '@directives/stop-propagation-on-mobile'
import { TooltipDirective } from './directives/tooltip/tooltip.directive'

import { IconArrowRightComponent } from './components/icons/icon-arrow-right/icon-arrow-right.component'
import { IconNotesComponent } from './components/icons/icon-notes/icon-notes.component'
import { IconGoogleComponent } from './components/icons/icon-google/icon-google.component'
import { IconSignOutComponent } from './components/icons/icon-sign-out/icon-sign-out.component'
import { IconLogoComponent } from './components/icons/icon-logo/icon-logo.component'
import { IconShareComponent } from './components/icons/icon-share/icon-share.component'
import { IconDeleteComponent } from './components/icons/icon-delete/icon-delete.component'
import { IconHideKeyboardComponent } from './components/icons/icon-hide-keyboard/icon-hide-keyboard.component'
import { IconCloseNoteComponent } from './components/icons/icon-close-note/icon-close-note.component'
import { LogoMobileComponent } from './components/icons/logo-mobile/logo-mobile.component'
import { PersistentAlertComponent } from './components/persistent-alert/persistent-alert/persistent-alert.component'
import { IconWarningComponent } from './components/icons/icon-warning/icon-warning.component'
import { SharingComponent } from './components/sharing/sharing.component'
import { IconShareGlobeComponent } from './components/icons/icon-share-globe/icon-share-globe.component'
import { IconRevokeComponent } from './components/icons/icon-revoke/icon-revoke.component'
import { IconCopyComponent } from './components/icons/icon-copy/icon-copy.component'
import { LoaderMobileComponent } from './components/loader-mobile/loader-mobile.component'
import { ButtonLogoutComponent } from './components/button-logout/button-logout.component'
import { IconNewComponent } from './components/icons/icon-new/icon-new.component'
import { IconCheckComponent } from './components/icons/icon-check/icon-check.component'

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
        IconShareGlobeComponent,
        IconRevokeComponent,
        IconCopyComponent,
        NoteForRecipientComponent,
        LoaderMobileComponent,
        ButtonLogoutComponent,
        StopPropagationOnMobileDirective,
        TooltipComponent,
        TooltipDirective,
        IconNewComponent,
        IconCheckComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        AngularTelegramLoginWidgetModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ClipboardModule,
    ],
    providers: [authInterceptorProvider, CookieService],
    bootstrap: [AppComponent],
})
export class AppModule {}
