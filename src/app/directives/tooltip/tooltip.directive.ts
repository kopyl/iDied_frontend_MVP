import { Directive, ElementRef, HostListener, Input } from "@angular/core"
import { TooltipService } from "@services/tooltip"

@Directive({
    selector: "[tooltip]",
})
export class TooltipDirective {
    position: TooltipPosition

    @Input() tooltip: string

    constructor(
        private readonly tooltipService: TooltipService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {}

    getPosition(): void {
        const html = this.elementRef.nativeElement
        const boundingClientRect = html.getBoundingClientRect()
        let top = boundingClientRect.top
        let right =
            window.innerWidth -
            boundingClientRect.right +
            boundingClientRect.width
        right = right + 15

        this.position = {
            top: top + "px",
            right: right + "px",
        }
    }

    resetHeight(): void {
        const elementRef = this.elementRef

        setTimeout(() => {
            const boundingClientRect =
                elementRef.nativeElement.getBoundingClientRect()
            let top = boundingClientRect.top

            const topOffset =
                this.tooltipService.height / 2 - boundingClientRect.height / 2
            top -= topOffset
            this.position.top = top + "px"
        }, 0)
    }

    showTooltip(event: MouseEvent): void {
        this.getPosition()
        this.tooltipService.show(this.position, this.tooltip)
        this.resetHeight()
    }

    @HostListener("mouseenter", ["$event"])
    onMouseEnter(event: MouseEvent): void {
        if (window.innerWidth <= 1000) return
        this.showTooltip(event)
    }

    @HostListener("mouseleave")
    onMouseLeave(): void {
        this.tooltipService.hide()
    }

    @HostListener("click", ["$event"])
    onClick(event): void {
        this.showTooltip(event)
    }
}
