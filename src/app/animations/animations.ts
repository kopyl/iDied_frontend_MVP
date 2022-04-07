import {
    animate,
    query,
    state,
    style,
    transition,
    trigger,
    group,
} from "@angular/animations"

const optional = { optional: true }

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

export const fader = [
    trigger("routeAnimations", [
        transition("* <=> *", [
            query(
                ":enter, :leave",
                [
                    style({
                        position: "absolute",
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        transform: "scale(0), translateY(100%)",
                    }),
                ],
                optional
            ),
            query(
                ":enter",
                [
                    animate(
                        "400ms ease",
                        style({
                            opacity: 1,
                            transform: "scale(1), translateY(0)",
                        })
                    ),
                ],
                optional
            ),
        ]),
    ]),
]

// id.doc.id#3
export const slider = [
    trigger("routeAnimations", [
        transition("isRight => isLeft", slideTo("left")),
        transition("isLeft => isRight", slideTo("right")),
    ]),
]

function slideTo(direction) {
    return [
        query(
            ":enter, :leave",
            [
                style({
                    position: "absolute",
                    top: "0%",
                    [direction]: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                }),
            ],
            optional
        ),

        query(":enter", [
            style({
                [direction]: "-5%",
                opacity: 0,
            }),
        ]),
        group([
            query(
                ":leave",
                [
                    animate(
                        "400ms ease",
                        style({
                            [direction]: "5%",
                            opacity: 0,
                        })
                    ),
                ],
                optional
            ),
            query(":enter", [
                animate(
                    "400ms ease",
                    style({
                        [direction]: "0%",
                        opacity: 1,
                    })
                ),
            ]),
        ]),
    ]
}
