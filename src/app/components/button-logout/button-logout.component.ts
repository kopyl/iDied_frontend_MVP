import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '@services/auth';

@Component({
  selector: 'button-logout',
  templateUrl: './button-logout.component.html',
  styleUrls: ['./button-logout.component.sass']
})
export class ButtonLogoutComponent implements OnInit {

  constructor(
    public readonly googleAuth: GoogleAuthService,
  ) { }

  ngOnInit(): void {
  }

}
