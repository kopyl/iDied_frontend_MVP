import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    OnInit
} from "@angular/core"

@Directive({
    selector: "[formFocus]",
})
export class FormFocusDirective implements OnChanges {
    @Input("formFocus") formFocus

    constructor(private el: ElementRef<HTMLTextAreaElement>) {}

    ngOnChanges(changes: SimpleChanges): void {


        const textArea = this.el.nativeElement
        const scrollHeight = textArea.scrollHeight


        textArea.style.height = ""
        textArea.style.height = scrollHeight + "px"


        if(this.el.nativeElement.id === "body") return

        textArea.focus()
    }
}
