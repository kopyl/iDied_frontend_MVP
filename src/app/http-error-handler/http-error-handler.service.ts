import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"
import { HttpErrorResponse } from "@angular/common/http"

const errorMessages = {
    generic: "The backend is down, try again later",
    notesLoad: "Unable to fetch notes from server, try again later",
}

@Injectable({
    providedIn: "root",
})
export class HttpErrorHandlerService {
    messageToShow: string
    constructor(private materialNotification: MatSnackBar) {}

    defineMessage(message) {
        switch (message) {
            case "notes":
                this.messageToShow = errorMessages.notesLoad
                break
            default:
                this.messageToShow = errorMessages.generic
        }
    }

    handle(error: HttpErrorResponse, message?: string) {
        this.defineMessage(message)
        this.materialNotification.open(this.messageToShow, "Close", {
            duration: 5000,
        })
    }
}
