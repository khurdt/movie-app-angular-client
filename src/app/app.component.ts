import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public Router: Router,) { }

  title = 'angularFlix-client';
  username: any = localStorage.getItem('user');
  token: any = localStorage.getItem('token');

  /**media queries for hamburger icon to show up or not */
  smallScreen: boolean = (window.innerWidth <= 700);
  largeScreen: boolean = (window.innerWidth >= 701);

  /**check tabs are for the navigation bar to know which page the user is currently on */
  checkTabMovie: boolean = (window.location.href.includes('movies'));
  checkTabUser: boolean = (window.location.href.includes('user'));
  checkTabGenres: boolean = (window.location.href.includes('genres'));
  checkTabDirectors: boolean = (window.location.href.includes('directors'));
  selectedTab: string = (this.checkTabMovie) ? 'movies' : (this.checkTabUser) ? 'user' : (this.checkTabGenres) ? 'genres' : (this.checkTabDirectors) ? 'directors' : 'movies';

  /**function to switch active navigation tab by highlighting it according to the current tab  */
  makeActive(tab: string) {
    this.selectedTab = tab;
  }
  /**gets username and token from local storage,
   * if they either one doesn't exist, travel to welcome page,
   * if they do exist travel to movies page
   */
  ngOnInit(): void {
    this.selectedTab = "movies";
    this.username = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    if (!this.username || !this.token) {
      this.Router.navigate(['welcome']);
    } else if (this.username && this.token) {
      this.Router.navigate(['movies']);
    }
  }
  /**clears local storage and navigates to welcome page */
  logout(): void {
    localStorage.clear();
    this.Router.navigate(['welcome']);
  }

}
