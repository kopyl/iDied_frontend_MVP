const en = {
    title: {
        main: 'Leave a note for your loved ones before you',
        span: 'die',
    },
    contact: 'Contact',
    instruction: {
        1: 'Write a note & share a link',
        2: {
            main: "Don't visit this app for",
            span: '30 days',
        },
        3: 'Now note is accessible by link',
    },
    loginOrSignup: 'Login or sign up',
    byGoogle: 'By Google',
    myNotes: 'My notes',
    signOut: 'Sign out',
    goPro: 'Get Pro features',
    notes: 'Notes',
    createNote: 'Create note',
    addTitle: 'Add title',
    addDescription: 'Add description',
    tooltip: {
        globe: 'This note will be accessible once you die',
    },
    share: 'Share',
    sharingSettings: 'Sharing settings',
    sharing: 'Sharing',
    sharingNotice: {
        general:
            'Any SHARED note will become accessible by a link unless you log in for 30 days',
        specific:
            'This note will become accessible by a link unless you log in for 30 days',
    },
    loading: 'Loading',
    buttons: {
        upgrade: 'Upgrade for $1.99/month',
        limitReachedUpgrade: 'Upgrade for $1.99/month',
        cancel: 'Cancel',
        remove: 'Remove',
        unshare: 'Unshare note',
        revoke: 'Revoke link',
        copyLink: 'Copy link',
        iUnderstand: 'I understand',
        tryAgain: 'Try again',
        login: 'Login',
    },
    popups: {
        titles: {
            wantToDelete: 'Do you really want to delete the note',
            proDetailed: 'Upgrade to Pro and get',
            proDetailedEmailRequest: 'Upgrade to pro to get email sharing and',
            proDetailedTelegramRequest:
                'Upgrade to pro to get Telegram sharing and',
            proLimitReached:
                'You have reached the limit of shared notes for free',
            remove: 'Remove note',
            unshare: 'Unshare note',
            revoke: "Revoke note's link",
            paymentSuccessful: 'Payment successful',
            paymentFailed: 'Payment failed',
            loginRequired: 'Login required',
            contacts: 'Send founder a message',
            supportConacts: 'Send support a message',
        },
        descriptions: {
            proDetailed: {
                telegram: {
                    title: 'Telegram online monitoring',
                    description:
                        'No need to visit this app to confirm that you’re alive! Telegram bot will monitor your online for you',
                },
                senders: {
                    title: 'Send notes via email and Telegram',
                    description: 'When you die',
                },
                unlimited: {
                    title: 'Unlimited notes to share',
                    description:
                        'On a free plan you can only share 3 notes. Share as many as you want on PRO',
                },
            },
            proLimitReached: 'Upgrade to Pro to share unlimited notes',
            unshare: {
                beforeTitle: 'Do you really want to unshare the note “',
                afterTitle:
                    'This note will become inaccessible by the public link after you die if you unshare',
            },
            revoke: {
                beforeTitle:
                    'Do you really want to change the access link to the note “',
                afterTitle:
                    "Everyone you shared your current link with, won't have any access to your note using it",
            },
            paymentSuccessful: 'Thank you for your purchase!',
            paymentFailed: 'Please can try again',
            loginRequired: 'Please login before making the payment',
        },
    },
    notifications: {
        copied: {
            body: 'Link copied. Now send it to somebody :)',
            cta: 'Close',
        },
        revoked: {
            body: 'Link revoked.',
            cta: 'Close',
        },
    },
    noteForRecipient: {
        title: {
            beforeSpan: 'You',
            span: "can't read",
            afterSpan: 'the note due to some or one of following reasons:',
        },
        reasons: {
            1: "Owner hasn't died",
            2: 'Note link is wrong or has been revoked / unshared by owner',
            3: 'Note has been deleted by the owner',
            4: 'Too many requests, you may be a scammer',
        },
        whatToDo: {
            text: 'Try again later or',
            link: 'contact support',
        },
        cantDiscloseReason:
            "We can't tell the exact reason due to security concerns",
    },
}

export type LocaleKey = typeof en

const ua: LocaleKey = {
    title: {
        main: 'Напиши листа близьким перш ніж',
        span: 'помреш',
    },
    contact: 'Контакти',
    instruction: {
        1: 'Напиши листа, поділися посиланням',
        2: {
            main: 'Не заходь сюди протягом',
            span: '30 днів',
        },
        3: 'Тепер лист доступний по посиланню',
    },
    loginOrSignup: 'Увійти',
    byGoogle: 'За допомогою Google',
    myNotes: 'Мої нотатки',
    signOut: 'Вийти',
    goPro: 'Перейти на Pro',
    notes: 'Нотатки',
    createNote: 'Створити нотатку',
    addTitle: 'Додайте заголовок',
    addDescription: 'Додайте опис',
    tooltip: {
        globe: 'Ця нотатка буде доступна після того, як ви помрете',
    },
    share: 'Поділитися',
    sharingSettings: 'Налаштування доступу',
    sharing: 'Поширення доступу',
    sharingNotice: {
        general:
            'Пошерена нотатка стане доступною по посиланню, якщо ви не зайдете на сайт раз в 30 днів',
        specific:
            'Ця нотатка стане доступною по посиланню, якщо ви не ввійдете протягом 30 днів',
    },
    loading: 'Завантаження',
    buttons: {
        upgrade: 'Перейти за $1.99/місяць',
        limitReachedUpgrade: 'Оновитись за $1.99/місяць',
        cancel: 'Скасувати',
        remove: 'Видалити',
        unshare: 'Закрити доступ',
        revoke: 'Змінити посилання',
        copyLink: 'Скопіювати посилання',
        iUnderstand: 'Я розумію',
        tryAgain: 'Спробувати ще раз',
        login: 'Увійти',
    },
    popups: {
        titles: {
            wantToDelete: 'Ви дійсно хочете видалити нотатку',
            proDetailed: 'Перейди на Pro і отримай',
            proDetailedEmailRequest:
                'Оновись до Pro щоб відправляти нотатки поштою і ще',
            proDetailedTelegramRequest:
                'Оновись до Pro щоб відправляти листи в Telegram і ще',
            proLimitReached: 'Ви досягли ліміту безкоштовно поширених нотаток',
            remove: 'Видалити нотатку',
            unshare: 'Закрити доступ',
            revoke: 'Відкликати доступ по існуючому посиланню',
            paymentSuccessful: 'Оплата успішна',
            paymentFailed: 'Оплата не пройшла',
            loginRequired: 'Ви повинні увійти в обліковий запис',
            contacts: 'Написати CEO',
            supportConacts: 'Написати в підтримку',
        },
        descriptions: {
            proDetailed: {
                telegram: {
                    title: 'Відслідковування онлайну в Telegram',
                    description:
                        'Не заходьте сюди щоб довести, що ви живі! Telegram бот робитиме це за вас',
                },
                senders: {
                    title: 'Ми надішлемо ваші листи по email і Telegram',
                    description: 'Після того, як ви помрете',
                },
                unlimited: {
                    title: 'Необмежена кількість нотаток',
                    description:
                        'Без Pro можна поділитись лише 3 нотатками, а з Pro – необмежено',
                },
            },
            proLimitReached:
                'Оновіться до Pro, щоб поділитися необмеженою кількістю нотаток',
            unshare: {
                beforeTitle: 'Ви дійсно хочете закрити доступ до нотатки “',
                afterTitle:
                    'Ця нотатка стане недоступною по посиланню після того, як ви помрете, якщо ви закриєте доступ',
            },
            revoke: {
                beforeTitle:
                    'Ви дійсно хочете змінити посилання доступу до нотатки “',
                afterTitle:
                    'Всі, з ким ви поділилися поточним посиланням, не матимуть доступу до вашої нотатки за допомогою нього',
            },
            paymentSuccessful:
                'Дякуємо за підтримку! Ви тепер можете користуватися Pro',
            paymentFailed: 'Спробуйте будь ласка ще раз',
            loginRequired:
                'Ви повинні увійти в обліковий запис, перш ніж заплатити',
        },
    },
    notifications: {
        copied: {
            body: 'Посилання скопійовано. Тепер відправте комусь :)',
            cta: 'Відхилити',
        },
        revoked: {
            body: 'Посилання відкликано.',
            cta: 'Закрити',
        },
    },
    noteForRecipient: {
        title: {
            beforeSpan: 'Доступ до нонатки',
            span: 'заборонено',
            afterSpan: 'За якихось або однієї з наступних причин:',
        },
        reasons: {
            1: 'Власник не загинув',
            2: 'Неправильне посилання або власник відкликав доступ',
            3: 'Власник видалив нотатку',
            4: 'Забагато запитів, можливо ви шахрай',
        },
        whatToDo: {
            text: 'Спробуйте пізніше або',
            link: 'напишіть до підтримки',
        },
        cantDiscloseReason:
            'Ми не можемо повідомити точну причину з міркувань безпеки',
    },
}

const ru: LocaleKey = {
    title: {
        main: 'Напиши письмо родным прежде чем ',
        span: 'умрешь',
    },
    contact: 'Контакты',
    instruction: {
        1: 'Напиши письмо, поделись ссылкой',
        2: {
            main: 'Не заходи сюда в течении',
            span: '30 дней',
        },
        3: 'Теперь письмо доступно по ссылке',
    },
    loginOrSignup: 'Ввойти',
    byGoogle: 'С помощью Google',
    myNotes: 'Мои заметки',
    signOut: 'Выйти',
    goPro: 'Перейти на Pro',
    notes: 'Заметки',
    createNote: 'Создать заметку',
    addTitle: 'Добавьте заголовок',
    addDescription: 'Добавьте описание',
    tooltip: {
        globe: 'Эта заметка будет доступна после того, как вы умрете',
    },
    share: 'Поделиться',
    sharingSettings: 'Настройка доступа',
    sharing: 'Поделиться доступом',
    sharingNotice: {
        general:
            'Расшаренная заметка станет доступна по ссылке, если вы не зайдете на сайт раз в 30 дней',
        specific:
            'Эта заметка станет доступна по ссылке, если вы не войдете в течение 30 дней',
    },
    loading: 'Загрузка',
    buttons: {
        upgrade: 'Подписаться за $1.99 в месяц',
        limitReachedUpgrade: 'Обновиться за $1.99 в месяц',
        cancel: 'Отменить',
        remove: 'Удалить',
        unshare: 'Закрыть доступ',
        revoke: 'Изменить ссылку',
        copyLink: 'Скопировать ссылку',
        iUnderstand: 'Я понимаю',
        tryAgain: 'Попробовать еще раз',
        login: 'Ввойти',
    },
    popups: {
        titles: {
            wantToDelete: 'Вы действительно хотите удалить заметку',
            proDetailed: 'Перейди на Pro и получи',
            proDetailedEmailRequest:
                'Обновись на Pro чтобы отправлять заметки по почте и',
            proDetailedTelegramRequest:
                'Обновись на Pro чтобы отправлять заметки в Telegram и',
            proLimitReached: 'Вы достигли лимита бесплатно расшаренных заметок',
            remove: 'Удалить заметку',
            unshare: 'Закрыть доступ',
            revoke: 'Отозвать доступ по существующей ссылке',
            paymentSuccessful: 'Оплата успешна',
            paymentFailed: 'Оплата не прошла',
            loginRequired: 'Вы должны войти в аккаунт',
            contacts: 'Написать CEO',
            supportConacts: 'Написать в поддержку',
        },
        descriptions: {
            proDetailed: {
                telegram: {
                    title: 'Отслеживание онлайн в Telegram',
                    description:
                        'Не заходите сюда, чтобы доказать, что вы живы! Telegram бот будет делать это за вас',
                },
                senders: {
                    title: 'Мы пришлем ваши письма по email и Telegram',
                    description: 'После того, как вы умрете',
                },
                unlimited: {
                    title: 'Неограниченное количество заметок',
                    description:
                        'Без Pro можно поделиться только 3 заметками, а с Pro – неограниченно',
                },
            },
            proLimitReached:
                'Обновитесь до Pro, чтобы поделиться неограниченным количеством заметок',
            unshare: {
                beforeTitle:
                    'Вы действительно хотите закрыть доступ к заметке“',
                afterTitle:
                    'Эта заметка станет недоступной по ссылке после того, как вы умрете, если вы закроете доступ',
            },
            revoke: {
                beforeTitle:
                    'Вы действительно хотите изменить ссылку доступа к заметке“',
                afterTitle:
                    'Все, с кем вы поделились текущей ссылкой, без доступа к вашей заметке с помощью него',
            },
            paymentSuccessful:
                'Спасибо за поддержку! Вы теперь можете пользоваться Pro',
            paymentFailed: 'Попробуйте еще раз',
            loginRequired: 'Вы должны войти в аккаунт, прежде чем заплатить',
        },
    },
    notifications: {
        copied: {
            body: 'Ссылка скопирована. Теперь отправьте кому-то :)',
            cta: 'Отклонить',
        },
        revoked: {
            body: 'Ссылка отозвана.',
            cta: 'Закрыть',
        },
    },
    noteForRecipient: {
        title: {
            beforeSpan: 'Доступ к заметке',
            span: 'запрещен',
            afterSpan: 'По какой-то или одной из следующих причин:',
        },
        reasons: {
            1: 'Владелец не умер',
            2: 'Неправильная ссылка или владелец отозвал доступ',
            3: 'Владелец удалил заметку',
            4: 'Слишком много запросов, может быть вы мошенник',
        },
        whatToDo: {
            text: 'Попробуйте позже или',
            link: 'напишите в поддержку',
        },
        cantDiscloseReason:
            'Мы не можем сообщить точную причину из соображений безопасности',
    },
}

export default { en, ru, ua }
