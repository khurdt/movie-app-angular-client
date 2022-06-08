import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  constructor(
    private Router: Router,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar) { }

  director: any = {};
  movies: any[] = [];

  ngOnInit(): void {
    this.getSingleDirector();
  }
  /**retrieves stored object from service or file 
   * then triggers getMovies() */
  getSingleDirector(): void {
    this.director = this.fetchApiData.getSingleObject();
    this.getMovies();
  }
  /**accessing function 'getAllMovies' from class fetchApiData,
   * in order to display any movie that matches the chosen director in a grid*/
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.filter((m: any) => m.director.name === this.director.name);
      return (this.movies);
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    });
  }
  /**if user clicks on movie card from the chosen director,
   * store movie object and navigate to movie view*/
  goToMovieView(event: any, movie: any): any {
    this.fetchApiData.storeSingleMovieData(movie);
    this.Router.navigate(['movie-view']);
  }
}

