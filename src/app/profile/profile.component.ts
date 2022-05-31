import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  }
  favoriteMovies: any[] = [];
  movies: any[] = [];
  favMovies: any[] = this.movies.map((movie) => movie._id == this.favoriteMovies.find(id => id == movie._id));
  anyFavMovies: boolean = (this.favMovies.length != 0);

  ngOnInit(): void {
    this.getUserInfo();
    this.getMovies();
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteConfirmationComponent, {
      //Container css
      width: '370px'
    });
  }

  getUserInfo(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
      this.userData.username = resp.username;
      this.userData.email = resp.email;
      this.userData.birthday = (resp.birthday !== null) ? (resp.birthday).slice(0, 10) : '';
      this.favoriteMovies = resp.favoriteMovies;
      return (this.userData, this.favoriteMovies);
    })
  }

  updateUser(): void {
    if (this.userData.username !== '' && this.userData.password !== '' && this.userData.email !== '') {
      this.fetchApiData.updateProfile({
        username: this.userData.username,
        password: this.userData.password,
        email: this.userData.email,
        birthday: this.userData.birthday,
      }).subscribe((result) => {
        this.snackBar.open('Your profile was updated successfully', 'OK', {
          duration: 2000
        });
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    } else {
      this.snackBar.open('Please enter your username, password, and email before updating', 'OK', {
        duration: 3000
      });
    }
  }

  getMovies(): void {
    //accessing function 'getAllMovies' from class fetchApiData
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

}
