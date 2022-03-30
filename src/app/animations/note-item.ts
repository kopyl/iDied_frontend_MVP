import {
    animate,
    query,
    stagger,
    state,
    style,
    transition,
    trigger,
    group,
    animateChild,
    keyframes
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

export const fader =
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    transform: 'scale(0), translateY(100%)'
                })
            ], { optional: true }),
            query(':enter', [
                animate('400ms ease',
                    style({
                        opacity: 1,
                        transform: 'scale(1), translateY(0)'
                    })
                )
            ], { optional: true }),
        ])
    ])
