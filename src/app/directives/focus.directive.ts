import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core"

@Directive({
    selector: "[appFocus]",
})
export class FocusDirective implements OnChanges {

    @Input('appFocus') formFocus

    constructor(private el: ElementRef<HTMLTextAreaElement>) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.el.nativeElement.focus()
    }
}
