import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public Router: Router) { }


  username: string = '';
  email: string = '';
  birthday: any = '';
  favoriteMoviesId: any[] = [];
  favoriteMovies: any[] = [];
  anyFavMovies: boolean = (this.favoriteMovies.length === 0);
  birthdayEmpty: boolean = (this.birthday === undefined || this.birthday === null);

  ngOnInit(): void {
    this.getUserInfo();
    this.anyFavMovies = (this.favoriteMovies.length === 0);
  }

  /**when user clicks manage account button, open angular material modal dialog for updating user info */
  openEditDialog(): void {
    this.dialog.open(EditProfileComponent, {
      data: {
        username: this.username,
        email: this.email,
        birthday: this.birthday
      },
      panelClass: 'custom-dialog-container'
    })
  }
  /**GET request of logged in user info to display then getsMovies() */
  getUserInfo(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
      this.username = resp.username;
      this.email = resp.email;
      this.birthday = (resp.birthday !== null) ? (resp.birthday).slice(0, 10) : '';
      this.favoriteMoviesId = resp.favoriteMovies;
      this.getMovies();
      return (this.username, this.email, this.birthday, this.favoriteMoviesId);
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    })
  }
  /**Gets all movies to display the movies that match users favorite movie IDs */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      const movies = resp;
      this.favoriteMovies = movies.filter((movie: any) => {
        return this.favoriteMoviesId.some((id) => {
          return id === movie._id;
        });
      });
      this.anyFavMovies = (this.favoriteMovies.length === 0)
      return this.favoriteMovies;
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    });
  }
  /**when user clicks delete button on movie card,
   * remove movieID from favorite Movie Array,
   * then call getUserInfo() in order to refresh their list of favorite movies
   */
  removeFavoriteMovie(event: any, movieID: number): any {
    this.fetchApiData.removeFavoriteMovie(movieID).subscribe((result) => {
      this.getUserInfo();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**when user clicks on picture of a movie card,
   * then store movie object and navigate to movie view
   */
  goToMovieView(event: any, movie: any): any {
    this.fetchApiData.storeSingleMovieData(movie);
    this.Router.navigate(['movie-view']);
  }

}
