import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class ProStatusService {
    public proStatus = true
    constructor() {}

    setProStatus(proStatus: boolean): void {
        this.proStatus = proStatus
    }
}
