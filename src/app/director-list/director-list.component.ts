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

  /**breakpoint for grid */
  mybreakpoint: number = 0;
  small: boolean = (window.innerWidth <= 600);
  medium: boolean = (window.innerWidth >= 601 && window.innerWidth <= 900);
  large: boolean = (window.innerWidth >= 901 && window.innerWidth <= 1400);

  ngOnInit(): void {
    this.getMovies();
    this.mybreakpoint = (this.small) ? 1 : (this.medium) ? 2 : (this.large) ? 3 : 4;
  }
  /**function for search bar of directors*/
  filterDirectors(event: any): any {
    this.filteredDirectors = (event.target.value === '') ?
      this.directors : (event.target.value !== '') ?
        this.directors.filter((director) => director.toLowerCase().includes(event.target.value.toLowerCase())) : this.directors;
    return this.filteredDirectors;
  }
  /**when user clicks on director name, 
   * gets whole object of director,
   * stores the object in a service or another file, 
   * then navigates to the director view*/
  goToDirectorView(event: any, director: any): any {
    let movie = this.movies.find((movie) => movie.director.name === director);
    let directorObject = movie.director
    this.fetchApiData.storeSingleObject(directorObject);
    this.Router.navigate(['director-view']);
  }
  /**function for the grid media queries */
  handleGridSize(event: any): any {
    this.mybreakpoint = (
      event.target.innerWidth <= 600) ? 1 :
      (event.target.innerWidth >= 601 && event.target.innerWidth <= 900) ? 2 :
        (event.target.innerWidth >= 901 && event.target.innerWidth <= 1400) ? 3 : 4;
  }
  /**gets all movies since the directors are within the movie objects and then creates a new set of directors so there are no repeats */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      let extractDirector = this.movies.map((movie) => movie.director.name)
      this.directors = [...new Set(extractDirector)];
      this.filteredDirectors = this.directors
      return (this.directors, this.filteredDirectors, this.movies);
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    });
  }

}
