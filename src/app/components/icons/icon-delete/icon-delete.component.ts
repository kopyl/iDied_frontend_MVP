import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'icon-delete',
    templateUrl: './icon-delete.component.html',
    styleUrls: ['./icon-delete.component.sass'],
})
export class IconDeleteComponent implements OnInit {
    @Input('color') color: string = '#878179'

    constructor() {}

    ngOnInit(): void {}
}
