import { Component, OnInit } from '@angular/core'
import { GoogleAuthService } from '@services/auth'
import { LangService } from '@services/lang'

@Component({
    selector: 'button-logout',
    templateUrl: './button-logout.component.html',
    styleUrls: ['./button-logout.component.sass'],
})
export class ButtonLogoutComponent implements OnInit {
    constructor(
        public readonly googleAuth: GoogleAuthService,
        public readonly lang: LangService
    ) {}

    ngOnInit(): void {}
}
