import {
    Component,
    OnInit,
    HostListener,
    Input,
    ElementRef,
    ViewChild,
} from "@angular/core"
import { popupFader, popupSlider } from "@animations"
import { IconCloseNoteComponent } from "../icons/icon-close-note/icon-close-note.component"
import { Subject } from "rxjs"
import { filter } from "rxjs/operators"

const shortenText = (title) => {
    return `${title.slice(0, 50)}...`
}

@Component({
    selector: "confirm-popup",
    templateUrl: "./confirm-popup.component.html",
    styleUrls: ["./confirm-popup.component.sass"],
    animations: [popupFader, popupSlider],
})
export class ConfirmPopupComponent implements OnInit {
    @Input("activeNote") activeNote: frontendNote

    keydowns$: Subject<KeyboardEvent> = new Subject()

    open = false
    public confirmButtonComponent = IconCloseNoteComponent
    public type: "noteRemoval" | "noteUnshare" | "linkRevoke" = "noteRemoval"
    public onSuccess = () => {}

    get activeNoteTitle(): string {
        const title = this.activeNote.title
        if (title.length > 50) {
            return shortenText(title)
        }
        return title
    }

    constructor(private html: ElementRef<HTMLDivElement>) {}

    ngOnInit(): void {
        this.keydowns$
            .pipe(
                filter((e) => this.open),
                filter((e) => e.key === "Escape")
            )
            .subscribe((e) => {
                this.open = false
            })
    }

    @HostListener("document:keydown", ["$event"])
    keydown(event: KeyboardEvent) {
        this.keydowns$.next(event)
    }

    // Implementing slide down the popup on drag

    @ViewChild("fg") fg
    firstY: number
    distance: number

    touchStart($event: TouchEvent) {
        this.firstY = $event.touches[0].clientY
    }

    touchMove($event: TouchEvent) {
        const currentY = $event.touches[0].clientY
        this.distance = currentY - this.firstY
        this.fg.nativeElement.style.top = `${this.distance}px`
    }

    touchEnd($event: TouchEvent) {
        if (this.distance > 150 || this.distance < -150) {
            this.open = false
        } else {
            this.fg.nativeElement.style.top = "0px"
        }
    }
}
