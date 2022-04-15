import { Component, OnInit, Input } from "@angular/core"

@Component({
    selector: "logo-mobile",
    templateUrl: "./logo-mobile.component.html",
    styleUrls: ["./logo-mobile.component.sass"],
})
export class LogoMobileComponent implements OnInit {
    constructor() {}

    @Input('red') red: boolean = false

    ngOnInit(): void {}
}
