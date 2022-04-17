import { Component, OnInit, Input } from "@angular/core"
import { expandRightLine } from "@animations"

@Component({
    selector: "loader-mobile",
    templateUrl: "./loader-mobile.component.html",
    styleUrls: ["./loader-mobile.component.sass"],
    animations: [expandRightLine],
})
export class LoaderMobileComponent implements OnInit {
    @Input("visible") visible: boolean

    constructor() {}

    ngOnInit(): void {}
}
