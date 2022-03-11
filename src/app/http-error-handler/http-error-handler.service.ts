import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar"
import { HttpErrorResponse } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(
    private materialNotification: MatSnackBar
  ) { }

  handle(error: HttpErrorResponse) {
    const message = "The backend is down, try again later"

    this.materialNotification.open(message, "Close", {
        duration: 5000,
    })
}
}
