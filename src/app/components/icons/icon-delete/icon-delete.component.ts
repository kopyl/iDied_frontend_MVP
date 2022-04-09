import { Component, OnInit, Input } from "@angular/core"

@Component({
    selector: "icon-delete",
    templateUrl: "./icon-delete.component.html",
    styleUrls: ["./icon-delete.component.sass"],
})
export class IconDeleteComponent implements OnInit {

    @Input('color') color: string = '#FF5C59'

    constructor() {}

    ngOnInit(): void {}
}
