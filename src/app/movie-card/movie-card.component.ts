import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

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
    public App: AppComponent,
    private Router: Router,
  ) { }

  searchInquiry: string = '';
  filteredMovies: any[] = [];
  movies: any[] = [];
  favoriteMovies: any[] = [];
  mybreakpoint: number = 0;
  small: boolean = (window.innerWidth <= 600);
  medium: boolean = (window.innerWidth >= 601 && window.innerWidth <= 900);
  large: boolean = (window.innerWidth >= 901 && window.innerWidth <= 1400);

  ngOnInit(): void {
    this.getMovies();
    this.getUserInfo();
    this.App.ngOnInit();
    this.mybreakpoint = (this.small) ? 1 : (this.medium) ? 2 : (this.large) ? 3 : 4;
  }

  filterMovies(event: any): any {
    this.filteredMovies = (event.target.value === '') ?
      this.movies : (event.target.value !== '') ?
        this.movies.filter((movie) => movie.title.toLowerCase().includes(event.target.value.toLowerCase())) : this.movies;
    return this.filteredMovies;
  }

  goToMovieView(event: any, movie: any): any {
    this.fetchApiData.storeSingleMovieData(movie);
    this.Router.navigate(['movie-view']);
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
      this.filteredMovies = this.movies;
      console.log(this.movies);
      return (this.movies, this.filteredMovies);
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
          duration: 1200
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
          duration: 1200
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
