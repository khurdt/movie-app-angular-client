import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /**this is the function that will open the register modal dialog when the signup button is clicked*/
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      panelClass: 'custom-dialog-container'
    });
  }
  /**this is the function that will open the login modal dialog when the login button is clicked*/
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      panelClass: 'custom-dialog-container'
    });
  }
}