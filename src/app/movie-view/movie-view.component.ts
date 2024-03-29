import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {

  constructor(
    private Router: Router,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar) { }

  movie: any = {};
  favoriteMovies: any[] = [];

  ngOnInit(): void {
    this.getSingleMovieData();
  }
  /**if user clicks on genre name, store genre object, and navigate to genre view */
  goToGenreView(): any {
    this.fetchApiData.storeSingleObject(this.movie.genre);
    this.Router.navigate(['genre-view']);
  }
  /**if user clicks on director name, store director object, and navigate to director view */
  goToDirectorView(): any {
    this.fetchApiData.storeSingleObject(this.movie.director);
    this.Router.navigate(['director-view']);
  }
  /**gets store movie object from fetchApiData service file */
  getSingleMovieData(): void {
    this.movie = this.fetchApiData.getSingleMovieData();
    this.getAllUsers();
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
      this.movie.likes = undefined;
      arrayOfAllFavorites.forEach((fav: any) => {
        if (fav === this.movie._id) {
          if (this.movie.likes === undefined) {
            this.movie.likes = 1
          } else if (this.movie.likes >= 1) {
            this.movie.likes++;
          }
        }
      });
      return (this.movie, this.favoriteMovies);
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
        this.getAllUsers();
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }
}
