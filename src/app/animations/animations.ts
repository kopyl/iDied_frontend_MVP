import {
    animate,
    query,
    state,
    style,
    transition,
    trigger,
    group,
    animateChild,
    sequence
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

        transition("* <=> void", []),
    ]),
]

export const popupSlider = trigger("popupSlider", [
    state(
        "void",
        style({top: "20px", opacity: "0", transform: "scale(.9)", borderRadius: "20px" })
    ),
    state(
        "*",
        style({top: "0px", opacity: "1", transform: "scale(1)"})
    ),

    transition("* <=> void", [animate(150)]),
])


export const popupFader = trigger("popupFader", [
    state(
        "void",
        style({opacity: "0"})
    ),
    state(
        "*",
        style({opacity: "1", transform: "translateY(0px)"})
    ),

    transition("* <=> void", [animate(150)]),
])

// export const popupSlider = trigger("popupSlider", [
//     state(
//         "void",
//         style({top: "200px" })
//     ),
//     state(
//         "*",
//         style({top: "0px"})
//     ),

//     transition("* <=> void", [animate(150)]),
// ])

// export const popupFader = trigger("popupFader", [
//     state(
//         "void",
//         style({opacity: "0"})
//     ),
//     state(
//         "*",
//         style({opacity: "1"})
//     ),

//     transition("* => void", [
//     style({
//         opacity: "1"
//     }),
//     sequence([
//         query("@popupSlider", [animateChild({duration: 650})]),
//         animate(150, style({opacity: "0"})),
//     ])


//     ]),


//     transition("void => *", [
//         style({
//             opacity: "0"
//         }),
//         sequence([
//             query("@popupSlider", [animateChild({duration: 650})]),
//             animate(150, style({opacity: "1"})),
//         ])


//         ])



// ])

// export const popupSlider = trigger('popupSlider', [
//     state('narrow', style({
//         width: '100px'
//     })),
//     state('wide', style({
//         width: '400px'
//     })),
//     transition('narrow => wide', [
//         style({
//             width: '100px'
//         }),
//         group([
//             animate('500ms', style({
//                 width: '400px'
//             })),
//             query('@stateInner', [
//                 animateChild()
//             ])
//         ])
//     ]),
//     transition('wide => narrow', [
//         style({
//             width: '400px'
//         }),
//         group([
//             animate('500ms', style({
//                 width: '100px'
//             })),
//             query('@stateInner', [
//                 animateChild()
//             ])
//         ])
//     ])
// ])

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
