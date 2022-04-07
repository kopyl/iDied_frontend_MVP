// id.doc.id#5
import { Directive, ElementRef, HostListener } from "@angular/core"

@Directive({
    selector: "[FixTextAreaTitleSizeOnDocumentResize]",
})
export class FixTextAreaTitleSizeOnDocumentResizeDirective {
    constructor(private el: ElementRef<HTMLFormElement>) {}

    @HostListener("window:resize")
    resize() {
        const activeElement = document?.activeElement

        const form = this.el.nativeElement
        const textAreas = {
            title: form.children[0] as HTMLTextAreaElement,
            body: form.children[1] as HTMLTextAreaElement,
        }

        if (activeElement?.id === "title" || activeElement?.id === "") {
            textAreas.title.focus()
        } else if (activeElement?.id === "body") {
            textAreas.body.focus()
        }
    }
}
