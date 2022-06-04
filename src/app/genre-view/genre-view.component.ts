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

  ngOnInit(): void {
    this.getSingleGenre();
  }

  getSingleGenre(): void {
    this.genre = this.fetchApiData.getSingleObject()
  }
}