import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
} from "@angular/core"

@Directive({
    selector: "[formFocusAndHeightAdjustment]",
})
export class FormFocusAndHeightAdjustmentDirective implements OnChanges {
    @Input("formFocusAndHeightAdjustment") formFocus

    constructor(private el: ElementRef<HTMLTextAreaElement>) {}

    ngOnChanges(changes: SimpleChanges): void {


        const textArea = this.el.nativeElement
        textArea.style.height = "0px"
        const scrollHeight = textArea.scrollHeight


        textArea.style.height = scrollHeight+1 + "px"
        /* fix issues where pop up opens on initial load
        and makes the textarea 1px smaller than it should be
        for some reason
        */




        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return
        // true for mobile device

        // false for not mobile device
        if(this.el.nativeElement.id === "body") return
        textArea.focus()

    }
}
