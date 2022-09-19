import { Injectable } from '@angular/core'
import copy from 'src/locale'

@Injectable({
    providedIn: 'root',
})
export class LangService {

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
