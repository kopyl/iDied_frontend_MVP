import { Component, OnInit, Input } from "@angular/core"

@Component({
    selector: "icon-logo",
    templateUrl: "./icon-logo.component.html",
    styleUrls: ["./icon-logo.component.sass"],
})
export class IconLogoComponent implements OnInit {
    @Input("color") color = 'white'

    constructor() {}

    ngOnInit(): void {}
}
