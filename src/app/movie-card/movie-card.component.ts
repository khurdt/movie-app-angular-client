import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //importing class 'fetchApiData' from the imported file FetchApiDataService
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }

  movies: any[] = [];
  favoriteMovies: any[] = [];
  mybreakpoint: number = 0;
  small: boolean = (window.innerWidth <= 600);
  medium: boolean = (window.innerWidth >= 601 && window.innerWidth <= 900);
  large: boolean = (window.innerWidth >= 901 && window.innerWidth <= 1400);
  searchInquiry: string = '';

  ngOnInit(): void {
    this.getMovies();
    this.getUserInfo();
    this.mybreakpoint = (this.small) ? 1 : (this.medium) ? 2 : (this.large) ? 3 : 4;
  }

  handleGridSize(event: any): any {
    this.mybreakpoint = (
      event.target.innerWidth <= 600) ? 1 :
      (event.target.innerWidth >= 601 && event.target.innerWidth <= 900) ? 2 :
        (event.target.innerWidth >= 901 && event.target.innerWidth <= 1400) ? 3 : 4;
  }

  getMovies(): void {
    //accessing function 'getAllMovies' from class fetchApiData
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUserInfo(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
      this.favoriteMovies = resp.favoriteMovies;
      return (this.favoriteMovies);
    })
  }

  handleFavoriteMovie(event: any, movieID: number): any {
    console.log(movieID);
    if (this.favoriteMovies.includes(movieID)) {
      this.fetchApiData.removeFavoriteMovie(movieID).subscribe((result) => {
        this.snackBar.open('movie was removed from favorite list!', 'OK', {
          duration: 2000
        });
        this.getUserInfo();
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieID).subscribe((result) => {
        this.snackBar.open('movie was added to favorite list!', 'OK', {
          duration: 2000
        });
        this.getUserInfo();
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }

}
