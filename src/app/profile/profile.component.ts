import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }


  username: string = '';
  email: string = '';
  birthday: any = '';
  favoriteMoviesId: any[] = [];
  movies: any[] = [];
  favoriteMovies: any[] = [];
  anyFavMovies: boolean = (this.favoriteMovies.length !== 0);
  birthdayEmpty: boolean = (this.birthday === '');
  mybreakpoint: number = 0;
  small: boolean = (window.innerWidth <= 600);
  medium: boolean = (window.innerWidth >= 601 && window.innerWidth <= 900);
  large: boolean = (window.innerWidth >= 901 && window.innerWidth <= 1400);

  ngOnInit(): void {
    this.getUserInfo();
    this.mybreakpoint = (this.small) ? 1 : (this.medium) ? 2 : (this.large) ? 3 : 4;
  }

  handleGridSize(event: any): any {
    this.mybreakpoint = (
      event.target.innerWidth <= 600) ? 1 :
      (event.target.innerWidth >= 601 && event.target.innerWidth <= 900) ? 2 :
        (event.target.innerWidth >= 901 && event.target.innerWidth <= 1400) ? 3 : 4;
  }

  openEditDialog(): void {
    this.dialog.open(EditProfileComponent, {
      data: {
        username: this.username,
        email: this.email,
        birthday: this.birthday
      },
      width: 'auto',
      maxHeight: '520px'
    })
  }

  getUserInfo(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
      this.username = resp.username;
      this.email = resp.email;
      this.birthday = (resp.birthday !== null) ? (resp.birthday).slice(0, 10) : '';
      this.favoriteMoviesId = resp.favoriteMovies;
      this.getMovies();
      return (this.username, this.email, this.birthday, this.favoriteMoviesId);
    })
  }

  getMovies(): void {
    //accessing function 'getAllMovies' from class fetchApiData
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        if (movie._id === this.favoriteMoviesId.find((m) => m === movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
      return this.movies;
    });
  }

  removeFavoriteMovie(event: any, movieID: number): any {
    this.fetchApiData.removeFavoriteMovie(movieID).subscribe((result) => {
      this.favoriteMovies = [];
      this.ngOnInit();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
