import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class LangService {
    _copy = {
        en: {
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
            goPro: 'Get unlimited access',
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
                upgrade: 'Upgrade for $1',
                cancel: 'Cancel',
                remove: 'Remove',
                unshare: 'Unshare note',
                revoke: 'Revoke link',
                copyLink: 'Copy link',
            },
            popups: {
                titles: {
                    wantToDelete: 'Do you really want to delete the note',
                    proDetailed: 'Upgrade to Pro',
                    remove: 'Remove note',
                    unshare: 'Unshare note',
                    revoke: "Revoke note's link",
                },
                descriptions: {
                    proDetailed:
                        'On a free account you can only share 3 notes. Upgrade to Pro to share unlimited notes for $1.',
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
                },
            },
            notifications: {
                copied: {
                    body: 'Link copied. Now send it to somebody :)',
                    cta: 'Close'
                },
                revoked: {
                    body: 'Link revoked.',
                    cta: 'Close'
                },
            }
        },
        ua: {
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
            goPro: 'Отримати безліміт',
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
                upgrade: 'Оновити за $1',
                cancel: 'Скасувати',
                remove: 'Видалити',
                unshare: 'Закрити доступ',
                revoke: 'Змінити посилання',
                copyLink: 'Скопіювати посилання',
            },
            popups: {
                titles: {
                    wantToDelete: 'Ви дійсно хочете видалити нотатку',
                    proDetailed: 'Отримати безліміт',
                    remove: 'Видалити нотатку',
                    unshare: 'Закрити доступ',
                    revoke: 'Відкликати доступ по існуючому посиланню',
                },
                descriptions: {
                    proDetailed:
                        'На безкоштовному обліковому записі ви можете поділитися лише 3 нотатками. Оновіться до Pro, щоб поділитися необмеженою кількістю нотаток за $1.',
                    proLimitReached: 'Оновіться до Pro, щоб поділитися необмеженою кількістю нотаток',
                    unshare: {
                        beforeTitle:
                            'Ви дійсно хочете закрити доступ до нотатки “',
                        afterTitle:
                            'Ця нотатка стане недоступною по посиланню після того, як ви помрете, якщо ви закриєте доступ',
                    },
                    revoke: {
                        beforeTitle:
                            'Ви дійсно хочете змінити посилання доступу до нотатки “',
                        afterTitle:
                            'Всі, з ким ви поділилися поточним посиланням, не матимуть доступу до вашої нотатки за допомогою нього',
                    },
                },
            },
            notifications: {
                copied: {
                    body: 'Посилання скопійовано. Тепер відправте комусь :)',
                    cta: 'Відхилити'
                },
                revoked: {
                    body: 'Посилання відкликано.',
                    cta: 'Закрити'
                },
            },
        },
    }

    public get copy() {
        return this._copy[this.lang]
    }

    private _lang: string = ''

    public get lang(): string {
        if (this._lang) return this._lang
        const fromStorage = localStorage.getItem('lang') || 'en'
        this.lang = fromStorage
        return fromStorage
    }

    public get flag(): string {
        return this.lang === 'en' ? 'ua-flag.svg' : 'en-flag.svg'
    }

    public set lang(lang: string) {
        if (this._lang === lang) return
        if (lang !== 'en' && lang !== 'ua') return
        this._lang = lang
        localStorage.setItem('lang', lang)
    }

    public toggle(): void {
        this.lang = this.lang === 'en' ? 'ua' : 'en'
    }
}
