import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  constructor(
    private Router: Router,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar) { }

  genre: any = {};
  movies: any[] = [];

  ngOnInit(): void {
    this.getSingleGenre();
  }
  /**retrieves stored object from service or file,
   * then triggers getMovies()*/
  getSingleGenre(): void {
    this.genre = this.fetchApiData.getSingleObject()
    this.getMovies();
  }
  /**accessing function 'getAllMovies' from class fetchApiData,
   * in order to display any movie that matches the chosen genre in a grid*/
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.filter((m: any) => m.genre.name === this.genre.name);
      return (this.movies);
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    });
  }
  /**if user clicks on movie card from the chosen genre,
   * store movie object and navigate to movie view*/
  goToMovieView(event: any, movie: any): any {
    this.fetchApiData.storeSingleMovieData(movie);
    this.Router.navigate(['movie-view']);
  }
}