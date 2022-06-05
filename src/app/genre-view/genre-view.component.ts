import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  constructor(
    private Router: Router,
    public fetchApiData: FetchApiDataService) { }

  genre: any = {};
  movies: any[] = [];

  ngOnInit(): void {
    this.getSingleGenre();
  }

  getSingleGenre(): void {
    this.genre = this.fetchApiData.getSingleObject()
    this.getMovies();
  }

  getMovies(): void {
    //accessing function 'getAllMovies' from class fetchApiData
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.filter((m: any) => m.genre.name === this.genre.name);
      return (this.movies);
    });
  }

  goToMovieView(event: any, movie: any): any {
    this.fetchApiData.storeSingleMovieData(movie);
    this.Router.navigate(['movie-view']);
  }
}