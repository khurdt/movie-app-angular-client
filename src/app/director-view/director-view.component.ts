import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  constructor(
    private Router: Router,
    public fetchApiData: FetchApiDataService) { }

  director: any = {};
  movies: any[] = [];

  ngOnInit(): void {
    this.getSingleDirector();
  }

  getSingleDirector(): void {
    this.director = this.fetchApiData.getSingleObject();
    this.getMovies();
  }

  getMovies(): void {
    //accessing function 'getAllMovies' from class fetchApiData
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.filter((m: any) => m.director.name === this.director.name);
      return (this.movies);
    });
  }

  goToMovieView(event: any, movie: any): any {
    this.fetchApiData.storeSingleMovieData(movie);
    this.Router.navigate(['movie-view']);
  }
}

