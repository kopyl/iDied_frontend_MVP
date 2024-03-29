import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'

const errorMessages = {
    generic: 'The backend is down, try again later',
    notesLoad: 'Unable to fetch notes from server, try again later',
    createNote: 'Unable to create note, try again later',
    onlineUpdate: 'Unable to save your last online, try again later',
    shareNote: 'Unable to share note, try again later',
    unshareNote: 'Unable to unshare note, try again later',
    revokeNote: 'Unable to revoke note, try again later',
    getNoteForRecepient: 'Unable to fetch note for recipient, try again later',
    destroyNote: 'Unable to destroy note, try again later',
}

@Injectable({
    providedIn: 'root',
})
export class HttpErrorHandlerService {
    messageToShow: string
    constructor(private materialNotification: MatSnackBar) {}

    defineMessage(message: string) {
        switch (message) {
            case 'notes':
                this.messageToShow = errorMessages.notesLoad
                break
            case 'createNote':
                this.messageToShow = errorMessages.createNote
                break
            case 'online':
                this.messageToShow = errorMessages.onlineUpdate
                break
            case 'share':
                this.messageToShow = errorMessages.shareNote
                break
            case 'unshare':
                this.messageToShow = errorMessages.unshareNote
                break
            case 'revoke':
                this.messageToShow = errorMessages.revokeNote
                break
            case 'note-for-recipient-destroy':
                this.messageToShow = errorMessages.destroyNote
                break
            case 'note-for-recipient':
                this.messageToShow = errorMessages.getNoteForRecepient
                break
            default:
                this.messageToShow = errorMessages.generic
        }
    }

    // handle(message?: string) {
    handle(
        i = {
            error: new HttpErrorResponse({}),
            message: '',
            enabled: true,
        } as any
    ) {
        if (i.enabled === false) return
        this.defineMessage(i.message!)
        console.log(i, i.message, this.messageToShow)
        this.materialNotification.open(this.messageToShow, 'Close', {
            duration: 5000,
            panelClass: ['notification'],
        })
    }
}
