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
            sharingNotice: {
                general:
                    'Any SHARED note will become accessible by a link unless you log in for 30 days',
                specific:
                    'This note will become accessible by a link unless you log in for 30 days',
            },
            cancel: 'Cancel',
            popups: {
                proDetailed: {
                    title: 'Upgrade to Pro',
                    description:
                        'On a free account you can only share 3 notes. Upgrade to Pro to share unlimited notes for $1.',
                    buttons: {
                        upgrade: 'Upgrade for $1',
                    },
                },
            },
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
            sharingNotice: {
                general:
                    'Пошерена нотатка стане доступною по посиланню, якщо ви не зайдете на сайт раз в 30 днів',
                specific:
                    'Ця нотатка стане доступною по посиланню, якщо ви не ввійдете протягом 30 днів',
            },
            cancel: 'Скасувати',
            popups: {
                proDetailed: {
                    title: 'Отримати безліміт',
                    description:
                        'На безкоштовному обліковому записі ви можете поділитися лише 3 нотатками. Оновіться до Pro, щоб поділитися необмеженою кількістю нотаток за $1.',
                    buttons: {
                        upgrade: 'Оновити за $1',
                    },
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
