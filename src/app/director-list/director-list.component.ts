import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrls: ['./director-list.component.scss']
})
export class DirectorListComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private Router: Router,
  ) { }

  movies: any[] = [];
  searchInquiry: string = '';
  filteredDirectors: any[] = [];
  directors: any[] = [];
  mybreakpoint: number = 0;
  small: boolean = (window.innerWidth <= 600);
  medium: boolean = (window.innerWidth >= 601 && window.innerWidth <= 900);
  large: boolean = (window.innerWidth >= 901 && window.innerWidth <= 1400);

  ngOnInit(): void {
    this.getMovies();
    this.mybreakpoint = (this.small) ? 1 : (this.medium) ? 2 : (this.large) ? 3 : 4;
  }

  filterMovies(event: any): any {
    this.filteredDirectors = (event.target.value === '') ?
      this.directors : (event.target.value !== '') ?
        this.directors.filter((director) => director.toLowerCase().includes(event.target.value.toLowerCase())) : this.directors;
    return this.filteredDirectors;
  }

  goToDirectorView(event: any, director: any): any {
    let movie = this.movies.find((movie) => movie.director.name === director);
    let directorObject = movie.director
    this.fetchApiData.storeSingleObject(directorObject);
    this.Router.navigate(['director-view']);
  }

  handleGridSize(event: any): any {
    this.mybreakpoint = (
      event.target.innerWidth <= 600) ? 1 :
      (event.target.innerWidth >= 601 && event.target.innerWidth <= 900) ? 2 :
        (event.target.innerWidth >= 901 && event.target.innerWidth <= 1400) ? 3 : 4;
  }

  getMovies(): void {
    //accessing function 'getAllMovies' from class fetchApiData
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      let extractDirector = this.movies.map((movie) => movie.director.name)
      this.directors = [...new Set(extractDirector)];
      this.filteredDirectors = this.directors
      return (this.directors, this.filteredDirectors, this.movies);
    });
  }

}
