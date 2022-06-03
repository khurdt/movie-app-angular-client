import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public Router: Router,
  ) { }

  ngOnInit(): void {
  }

  @Input() loginData = {
    username: '',
    password: ''
  }

  userLogin(): void {
    this.fetchApiData.userLogIn({
      username: this.loginData.username,
      password: this.loginData.password
    }).subscribe((result) => {
      this.dialogRef.close();
      this.Router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('Username or Password is incorrect', 'OK', {
        duration: 2000
      });
    });
  }

}
