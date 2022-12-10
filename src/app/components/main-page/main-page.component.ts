import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
    @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent

    constructor(
        private router: Router,
        public googleAuth: GoogleAuthService,
        private pageTitle: Title,
        public lang: LangService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.googleAuth.accessControl()
        this.pageTitle.setTitle('After-death notes')
    }

    ngAfterViewInit(): void {
        this.lang.confirmPopup = this.confirmPopup

        if (this.route.snapshot.queryParams['langselect'] === 'true') {
            this.confirmPopup.onCancel = () => {
                this.router.navigate([''], {
                    queryParamsHandling: 'merge',
                    queryParams: { langselect: false },
                })
                this.confirmPopup.onCancel = () => {}
            }
            this.lang.toggle()
        }
    }

    requestContactsPopup(): void {
        this.confirmPopup.type = 'contacts'
        this.confirmPopup.open = true
    }
}
