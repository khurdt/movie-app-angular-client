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

  ngOnInit(): void {
    this.getSingleDirector();
  }

  getSingleDirector(): void {
    this.director = this.fetchApiData.getSingleObject();
  }
}

