import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {

  constructor(
    private Router: Router,
    public fetchApiData: FetchApiDataService) { }

  movie: any = {};

  ngOnInit(): void {
    this.getSingleMovieData();
  }

  getSingleMovieData(): void {
    this.movie = this.fetchApiData.getSingleMovieData()
  }
}
