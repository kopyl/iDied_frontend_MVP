import { Component, Input, OnInit, HostBinding } from "@angular/core"
import { fadeInOut } from "@animations"

@Component({
    selector: "loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.sass"],
    animations: [fadeInOut],
})
export class LoaderComponent implements OnInit {
    constructor() {}

    @Input("visible") visible: boolean
    @Input("isAvatar") isAvatar: boolean

    @HostBinding("class.mobileHidden") @Input() hideOnMobile: boolean

    ngOnInit(): void {}
}
