import {
    animate,
    query,
    stagger,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations"

export const noteItem = [
    trigger("note-item", [
        state(
            "void",
            style({ position: "relative", top: "-50px", marginBottom: "-55px" })
        ),
        state(
            "*",
            style({ position: "relative", top: "0px", marginBottom: "5px" })
        ),

        transition("* <=> void", [animate(100)]),
    ]),
]
