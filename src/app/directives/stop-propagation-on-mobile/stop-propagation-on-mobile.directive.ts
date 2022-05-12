import { Directive, HostListener } from "@angular/core"

@Directive({
    selector: "[stopPropagationOnMobile]",
})
export class StopPropagationOnMobileDirective {

    @HostListener("click", ["$event"])
    stopPropagation(event: MouseEvent): void {
        if (window.innerWidth > 1000) return
        event.stopPropagation()
    }

}
