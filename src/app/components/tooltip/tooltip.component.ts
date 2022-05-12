import {
    Component,
    AfterViewInit,
    AfterContentChecked,
    ViewChild,
} from "@angular/core"
import { TooltipService } from "@services/tooltip"
import { tooltipFader, tooltipFaderParent } from "@animations"
import { ElementRef } from "@angular/core"

@Component({
    selector: "tooltip",
    templateUrl: "./tooltip.component.html",
    styleUrls: ["./tooltip.component.sass"],
    animations: [tooltipFader, tooltipFaderParent],
})
export class TooltipComponent implements AfterViewInit {
    @ViewChild("inner") inner: ElementRef

    constructor(public tooltip: TooltipService, public ref: ElementRef) {}

    ngAfterViewInit() {
        this.tooltip.ref = this.ref.nativeElement
    }
}
