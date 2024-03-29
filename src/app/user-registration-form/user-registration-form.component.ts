// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**gets inputted data from html template */
  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birthday: ''
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public Router: Router,
  ) { }

  ngOnInit(): void { }
  /**close registration modal dialog */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**when user presses register button,
   * creates user in users collection in database,
   * then automatically logs user in by calling userLogin()
   */
  registerUser(): void {
    this.fetchApiData.userRegistration({
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email,
      birthday: this.userData.birthday
    }).subscribe((result) => {
      this.userLogin();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  userLogin(): void {
    this.fetchApiData.userLogIn({
      username: this.userData.username,
      password: this.userData.password
    }).subscribe((result) => {
      this.dialogRef.close();
      this.Router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
