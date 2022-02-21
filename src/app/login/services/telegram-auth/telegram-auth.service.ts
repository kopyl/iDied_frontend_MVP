import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root",
})
export class TelegramAuthService {
    constructor() {}

    TGonLoad() {}
    TGonLoadError() {}
    TGonLogin($event) {
        console.log($event)
    }

    botname = "idied_bot"
    WidgetConfiguration = {
        accessToWriteMessages: true,
    }
}
