import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-login',
  template: `
  Username: <input type='text' [formControl]='userNameControl'>
  `
})

export class LoginComponent {
  userNameControl = new FormControl('');
}