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

  goToGenreView(): any {
    this.fetchApiData.storeSingleObject(this.movie.genre);
    this.Router.navigate(['genre-view']);
  }

  goToDirectorView(): any {
    this.fetchApiData.storeSingleObject(this.movie.director);
    this.Router.navigate(['director-view']);
  }

  getSingleMovieData(): void {
    this.movie = this.fetchApiData.getSingleMovieData()
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
