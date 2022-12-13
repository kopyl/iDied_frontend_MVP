import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { GoogleAuthService } from '@services/auth'
import {
    buttonSliderNotes,
    buttonSlider,
    logoutButtonSlider,
} from '@animations'
import { Title } from '@angular/platform-browser'
import { LangService } from '@services/lang'
import { ConfirmPopupComponent } from '@components/confirmation-popup'

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.sass'],
    animations: [buttonSliderNotes, buttonSlider, logoutButtonSlider],
})
export class MainPageComponent implements OnInit, AfterViewInit {
    popupOpened = false

    @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent

    constructor(
        public googleAuth: GoogleAuthService,
        private pageTitle: Title,
        public lang: LangService
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        this.pageTitle.setTitle('After-death notes')
    }

    ngAfterViewInit(): void {
        this.lang.confirmPopup = this.confirmPopup
    }

    requestContactsPopup(): void {
        this.confirmPopup.type = 'contacts'
        this.confirmPopup.open = true
    }
}
