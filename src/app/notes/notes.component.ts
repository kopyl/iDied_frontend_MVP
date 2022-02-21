import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {

    public userDetails
    public jwt_token: string

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
      const storage = localStorage.getItem('google_auth')
      const jwt_from_backend = localStorage.getItem('jwt_token')

      if (storage && jwt_from_backend) {
          this.userDetails = JSON.parse(storage)
          this.jwt_token = JSON.parse(jwt_from_backend)
      } else {
          this.signOut()
      }
  }

  signOut() {
      localStorage.removeItem('google_auth')
      localStorage.removeItem('jwt_token')
      this.router.navigateByUrl('').then()
  }

  checkLoginStatus() {
      console.log(this.userDetails)
      console.log(this.jwt_token)
  }

}
