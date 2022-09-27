import { Injectable } from '@angular/core'
import copy from 'src/locale'
import { ConfirmPopupComponent } from '@components/confirmation-popup'

@Injectable({
    providedIn: 'root',
})
export class LangService {
    confirmPopup: ConfirmPopupComponent

    public get copy() {
        return copy[this.lang]
    }

    private _lang: string = ''

    public get lang(): string {
        if (this._lang) return this._lang
        const fromStorage = localStorage.getItem('lang') || 'en'
        this.lang = fromStorage
        return fromStorage
    }

    public get flag(): string {
        if (this.lang === 'ua') return 'ua-flag.svg'
        if (this.lang === 'ru') return 'ru-flag.svg'
        return 'en-flag.svg'
    }

    public set lang(lang: string) {
        if (this._lang === lang) return
        if (lang !== 'en' && lang !== 'ua' && lang !== 'ru') return
        this._lang = lang
        localStorage.setItem('lang', lang)
    }

    public setLang = (lang: string): void => {
        this.lang = lang
        this.confirmPopup.open = false
    }

    public toggle(): void {
        // this.lang = this.lang === 'en' ? 'ua' : 'en'
        this.confirmPopup.type = 'lang'
        this.confirmPopup.title = 'Choose language'
        this.confirmPopup.open = true
        this.confirmPopup.setLang = this.setLang
    }
}
