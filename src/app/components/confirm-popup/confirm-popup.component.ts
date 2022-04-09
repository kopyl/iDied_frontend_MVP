import { Component, OnInit, HostListener, Input } from "@angular/core"
import { popupFader, popupSlider } from "@animations"
import { IconCloseNoteComponent } from "../icons/icon-close-note/icon-close-note.component"

@Component({
    selector: "confirm-popup",
    templateUrl: "./confirm-popup.component.html",
    styleUrls: ["./confirm-popup.component.sass"],
    animations: [popupFader, popupSlider]
})
export class ConfirmPopupComponent implements OnInit {

    @Input('activeNote') activeNote: frontendNote

    visible = false
    public confirmButtonComponent = IconCloseNoteComponent
    public onSuccess: Function
    public type: "noteRemoval" | "noteUnshare" = "noteRemoval"

    constructor() {}

    get activeNoteTitle(): string {
        if (this.activeNote.title.length > 50) {
            return `${this.activeNote.title.slice(0, 50)}...`
        }
        return this.activeNote.title
    }

    ngOnInit(): void {}

}
