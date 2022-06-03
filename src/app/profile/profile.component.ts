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
  favoriteMovies: any[] = [];
  anyFavMovies: boolean = (this.favoriteMovies.length === 0);
  birthdayEmpty: boolean = (this.birthday === '');

  ngOnInit(): void {
    this.getUserInfo();
    this.anyFavMovies = (this.favoriteMovies.length === 0);
  }


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
      const movies = resp;
      this.favoriteMovies = movies.filter((movie: any) => {
        return this.favoriteMoviesId.some((id) => {
          return id === movie._id;
        });
      });
      this.anyFavMovies = (this.favoriteMovies.length === 0)
      return this.favoriteMovies;
    });
  }

  removeFavoriteMovie(event: any, movieID: number): any {
    this.fetchApiData.removeFavoriteMovie(movieID).subscribe((result) => {
      this.getUserInfo();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
