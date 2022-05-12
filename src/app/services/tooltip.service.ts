import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root",
})
export class TooltipService {
    public shown = false
    public position: TooltipPosition
    public text = ""
    public ref: any

    timeoutID: any | number

    get height(): number {
        return this.ref.firstChild.offsetHeight
    }

    private processMobile(): void {
        clearTimeout(this.timeoutID)
        this.timeoutID = setTimeout(() => {
            this.hide()
        }, 3000)


    }

    public show(position: TooltipPosition, text): void {

        this.position = position
        this.text = text

        if (window.innerWidth <= 1000) {
            this.processMobile()
        }

        if (this.shown) {
            this.hide()
            return
        }
        this.shown = true
    }

    public hide(): void {
        this.shown = false
    }
}
