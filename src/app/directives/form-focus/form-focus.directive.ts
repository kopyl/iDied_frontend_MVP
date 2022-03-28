import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
} from "@angular/core"

@Directive({
    selector: "[formFocus]",
})
export class FormFocusDirective implements OnChanges {
    @Input("formFocus") formFocus

    constructor(private el: ElementRef<HTMLTextAreaElement>) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.el.nativeElement.focus()
    }
}
