import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {


    constructor(
        private router: Router,
    ) {}


    ngOnInit(): void {
        const storage = localStorage.getItem('google_auth')

        if (storage) {
            this.router.navigateByUrl('/notes').then()
        }
    }
}
