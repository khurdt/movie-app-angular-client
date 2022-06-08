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
    this.App.ngOnInit();
    this.mybreakpoint = (this.small) ? 1 : (this.medium) ? 2 : (this.large) ? 3 : 4;
  }
  /**search bar function for all movies */
  filterMovies(event: any): any {
    this.filteredMovies = (event.target.value === '') ?
      this.movies : (event.target.value !== '') ?
        this.movies.filter((movie) => movie.title.toLowerCase().includes(event.target.value.toLowerCase())) : this.movies;
    return this.filteredMovies;
  }
  /**if movie card is clicked, 
   * store movie object and navigate to movie view*/
  goToMovieView(event: any, movie: any): any {
    this.fetchApiData.storeSingleMovieData(movie);
    this.Router.navigate(['movie-view']);
  }
  /**media queries for movie card grid */
  handleGridSize(event: any): any {
    this.mybreakpoint = (
      event.target.innerWidth <= 600) ? 1 :
      (event.target.innerWidth >= 601 && event.target.innerWidth <= 900) ? 2 :
        (event.target.innerWidth >= 901 && event.target.innerWidth <= 1400) ? 3 : 4;
  }
  /**get all movies to display and then getAllUsers() */
  getMovies(): void {
    //accessing function 'getAllMovies' from class fetchApiData
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filteredMovies = this.movies;
      this.getAllUsers();
      return (this.movies, this.filteredMovies);
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    });
  }
  /**getting individual user from here in order to not make another http request
   * getting All Users in order to display the total amount of likes of each movie,
   * reduced users arrays to one array of all favorite movie id's, 
   * then mapped through movies to see if they match any ID arrayOfAllFavorites,
   * if there is any repeats, then the count of likes increases,
   * everytime this is called, the likes are wiped and recounted,
   */
  getAllUsers(): void {
    this.fetchApiData.getAllUsers().subscribe((resp: any) => {
      let users = resp;
      let currentUser = users.find((user: any) => { return user.username === (localStorage.getItem('user')) });
      this.favoriteMovies = currentUser.favoriteMovies;
      let arrayOfAllFavorites = users.reduce((accumulator: any, obj: any) => [...accumulator, ...obj.favoriteMovies], []);
      this.filteredMovies.map((m) => {
        m.likes = undefined;
        arrayOfAllFavorites.forEach((fav: any) => {
          if (fav === m._id) {
            if (m.likes === undefined) {
              m.likes = 1
            } else if (m.likes >= 1) {
              m.likes++;
            }
          }
        })
      });
      return (this.filteredMovies, this.favoriteMovies);
    }, (resp: any) => {
      console.log(resp);
    })
  }
  /**when user clicks heart icon, 
* it will trigger the POST or DELETE function whether the movieID is in their favorite Array already or not*/
  handleFavoriteMovie(event: any, movieID: number): any {
    console.log(movieID);
    if (this.favoriteMovies.includes(movieID)) {
      this.fetchApiData.removeFavoriteMovie(movieID).subscribe((result) => {
        this.snackBar.open('movie was removed from favorite list!', 'OK', {
          duration: 1200
        });
        // this.getUserInfo();
        this.getAllUsers();
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
        // this.getUserInfo();
        this.getAllUsers();
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }

}
