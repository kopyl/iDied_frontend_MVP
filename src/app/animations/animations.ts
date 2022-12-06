import {
    animate,
    query,
    state,
    style,
    transition,
    trigger,
    group,
    animateChild,
    sequence,
    stagger,
    keyframes,
} from '@angular/animations'

const optional = { optional: true }

export const noteItem = trigger('noteItem', [
    state(
        'void',
        style({ position: 'relative', top: '-50px', marginBottom: '-55px' })
    ),
    state(
        '*',
        style({ position: 'relative', top: '0px', marginBottom: '5px' })
    ),

    transition('* <=> void', [animate(150)]),
])

export const fadeSlideInOut = trigger('fadeSlideInOut', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
    ]),
])

export const logoutButtonSlider = trigger('logoutButtonSlider', [
    state('void', style({ opacity: '0', transform: 'translateY(-100px)' })),
    state('*', style({ opacity: '1', transform: 'stranslateY(0px)' })),

    transition('void => *', [animate('400ms ease-out')]),
    transition('* => void', [animate('400ms ease-out')]),
])

export const buttonSlider = trigger('buttonSlider', [
    state(
        'void',
        style({ bottom: '-60px', opacity: '0', transform: 'scale(.8)' })
    ),
    state('*', style({ bottom: '0px', opacity: '1', transform: 'scale(1)' })),

    transition('void => *', [animate('400ms ease-out')]),
    transition('* => void', [animate('400ms ease-out')]),
])

export const buttonSliderNotes = trigger('buttonSliderNotes', [
    state(
        'false',
        style({ top: '20px', opacity: '0', transform: 'scale(.9)' })
    ),
    state('true', style({ top: '0px', opacity: '1', transform: 'scale(1)' })),

    // transition("true <=> false", [animate('1050ms')]),
    transition('true => false', [
        animate(
            '1050ms',
            keyframes([
                style({ top: '0px', opacity: '1', transform: 'scale(1)' }),
                style({ top: '0px', opacity: '1', transform: 'scale(1)' }),
                style({ top: '0px', opacity: '0', transform: 'scale(1)' }),
            ])
        ),
    ]),

    transition('false => true', [
        animate(
            '1050ms',
            keyframes([
                style({ top: '0px', opacity: '0', transform: 'scale(1)' }),
                style({ top: '0px', opacity: '0', transform: 'scale(1)' }),
                style({ top: '0px', opacity: '1', transform: 'scale(1)' }),
            ])
        ),
    ]),
])

// offset: 0

export const popupSlider = trigger('popupSlider', [
    state(
        'void',
        style({
            top: '20px',
            opacity: '0',
            transform: 'scale(.9)',
            borderRadius: '20px',
        })
    ),
    state('*', style({ top: '0px', opacity: '1', transform: 'scale(1)' })),

    transition('* <=> void', [animate(150)]),
])

export const popupFader = trigger('popupFader', [
    state('void', style({ opacity: '0' })),
    state('*', style({ opacity: '1', transform: 'translateY(0px)' })),

    transition('* <=> void', [animate(150)]),
])

export const tooltipFaderParent = trigger('tooltipFaderParent', [
    state('void', style({ opacity: '0' })),
    state('*', style({ opacity: '1' })),

    transition('* <=> *', [
        group([
            query('@tooltipFader', animateChild({ duration: '100ms' })),
            animate(100),
        ]),
    ]),
])

export const tooltipFader = trigger('tooltipFader', [
    state('*', style({ transform: 'translateX(0px)' })),
    state('void', style({ transform: 'translateX(-20px)' })),

    transition('* <=> void', [animate(100)]),
])

export const fadeInOut = trigger('fadeInOut', [
    state('void', style({ opacity: '0' })),
    state('*', style({ opacity: '1' })),

    transition('* <=> void', [animate(150)]),
])

export const expandRightLine = trigger('expandRightLine', [
    state('void', style({ width: '0%' })),
    state('*', style({ width: '100%' })),

    transition('void => *', [animate('10s')]),

    transition('* => void', [
        animate(
            250,
            keyframes([
                style({ width: '100%', opacity: '1', offset: 0 }),
                style({ width: '100%', opacity: '1', offset: 0.5 }),
                style({ width: '100%', opacity: '0', offset: 1 }),
            ])
        ),
    ]),
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
    trigger('routeAnimations', [
        transition('isRight => isLeft', slideTo('left')),
        transition('isLeft => isRight', slideTo('right')),
    ]),
]

function slideTo(direction) {
    return [
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    top: '0%',
                    [direction]: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                }),
            ],
            optional
        ),

        query(':enter', [
            style({
                [direction]: '-5%',
                opacity: 0,
            }),
        ]),
        group([
            query(
                ':leave',
                [
                    animate(
                        '400ms ease',
                        style({
                            [direction]: '5%',
                            opacity: 0,
                        })
                    ),
                ],
                optional
            ),
            query(':enter', [
                animate(
                    '400ms ease',
                    style({
                        [direction]: '0%',
                        opacity: 1,
                    })
                ),
            ]),
        ]),
    ]
}
