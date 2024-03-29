import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'icon-arrow-right',
    templateUrl: './icon-arrow-right.component.html',
    styleUrls: ['./icon-arrow-right.component.sass'],
})
export class IconArrowRightComponent implements OnInit {
    constructor() {}
    @Input('color') color: string = 'white'

    ngOnInit(): void {}
}
