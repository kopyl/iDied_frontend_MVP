import { Injectable } from '@angular/core'
import copy, { LocaleKey } from 'src/locale'
import { ConfirmPopupComponent } from '@components/confirmation-popup'

const defaultLocale = 'ua'
const locales = ['ua', 'en', 'ru']
const flags = {
    ua: 'ua-flag.svg',
    en: 'en-flag.svg',
    ru: 'ru-flag.svg',
} as const

export type LocaleCode = 'ua' | 'en' | 'ru' | ''
type Flag = typeof flags[keyof typeof flags]

@Injectable({
    providedIn: 'root',
})
export class LangService {
    confirmPopup: ConfirmPopupComponent

    public get copy(): LocaleKey {
        return copy[this.lang]
    }

    private _lang: LocaleCode = ''

    public get lang(): LocaleCode {
        if (this._lang) return this._lang
        const fromStorage = <LocaleCode>localStorage.getItem('lang')
        this.lang = fromStorage || defaultLocale
        return fromStorage || defaultLocale
    }

    public get flag(): Flag {
        return flags[this.lang]
    }

    public set lang(lang: LocaleCode) {
        if (this._lang === lang) return
        if (!locales.includes(lang)) return
        this._lang = lang
        localStorage.setItem('lang', lang)
    }

    public setLang = (lang: LocaleCode): void => {
        this.lang = lang
        this.confirmPopup.open = false
    }

    public toggle(): void {
        this.confirmPopup.type = 'lang'
        this.confirmPopup.title = 'Language'
        this.confirmPopup.open = true
        this.confirmPopup.setLang = this.setLang
    }
}
