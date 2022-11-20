import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'icon-share',
    templateUrl: './icon-share.component.html',
    styleUrls: ['./icon-share.component.sass'],
})
export class IconShareComponent implements OnInit {
    @Input('color') color: string = '#878179'

    constructor() {}

    ngOnInit(): void {}
}
