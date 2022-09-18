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
            notes: 'Notes',
            loginOrSignup: 'Login or sign up',
            byGoogle: 'By Google',
            myNotes: 'My notes',
            signOut: 'Sign out',
            goPro: 'Get unlimited access',
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
            notes: 'Нотатки',
            loginOrSignup: 'Увійти',
            byGoogle: 'За допомогою Google',
            myNotes: 'Мої нотатки',
            signOut: 'Вийти',
            goPro: 'Отримати безліміт',
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
