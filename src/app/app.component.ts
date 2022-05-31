import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public Router: Router) { }

  username = localStorage.getItem('user');
  token = localStorage.getItem('token');
  smallScreen: boolean = (window.innerWidth <= 700);
  largeScreen: boolean = (window.innerWidth >= 701);
  checkTabMovie: boolean = (window.location.href.includes('movies'));
  checkTabUser: boolean = (window.location.href.includes('user'));
  selectedTab = (this.checkTabMovie) ? "movies" : (this.checkTabUser) ? "user" : "movies";

  makeActive(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    if (!this.username || !this.token) {
      this.Router.navigate(['welcome']);
    }
  }

  logout(): void {
    localStorage.clear();
    this.Router.navigate(['welcome']);
  }

}
