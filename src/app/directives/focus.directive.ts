import { Directive, ElementRef, Input, AfterViewInit, HostListener, OnChanges, SimpleChanges } from "@angular/core"

@Directive({
    selector: "[appFocus]",
})
export class FocusDirective implements AfterViewInit, OnChanges {

    @Input('appFocus') test

    constructor(private el: ElementRef) {}

    ngAfterViewInit(): void {
        // console.log(this.el, "wow")
    }

    // @HostListener("document:click", ["$event"])
    // handleClicks(event: Event) {
    //     console.log(event.target)
    // }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes, "OnChanges2")
    }
}
