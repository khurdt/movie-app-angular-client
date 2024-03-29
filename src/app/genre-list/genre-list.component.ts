import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private Router: Router,
  ) { }

  searchInquiry: string = '';
  genres: any[] = [];
  filteredGenres: any[] = [];
  movies: any[] = [];
  mybreakpoint: number = 0;
  small: boolean = (window.innerWidth <= 600);
  medium: boolean = (window.innerWidth >= 601 && window.innerWidth <= 900);
  large: boolean = (window.innerWidth >= 901 && window.innerWidth <= 1400);

  ngOnInit(): void {
    this.getMovies();
    this.mybreakpoint = (this.small) ? 1 : (this.medium) ? 2 : (this.large) ? 3 : 4;
  }
  /**function for search bar of genres*/
  filterGenres(event: any): any {
    this.filteredGenres = (event.target.value === '') ?
      this.genres : (event.target.value !== '') ?
        this.genres.filter((genre) => genre.toLowerCase().includes(event.target.value.toLowerCase())) : this.genres;
    return this.filteredGenres;
  }
  /**when user clicks on a genre name, 
   * gets whole object of genre,
   * stores the object in a service or another file, 
   * then navigates to the genre view*/
  goToGenreView(event: any, genre: any): any {
    let movie = this.movies.find((movie) => movie.genre.name === genre);
    let genreObject = movie.genre
    this.fetchApiData.storeSingleObject(genreObject);
    this.Router.navigate(['genre-view']);
  }
  /**function for the grid media queries */
  handleGridSize(event: any): any {
    this.mybreakpoint = (
      event.target.innerWidth <= 600) ? 1 :
      (event.target.innerWidth >= 601 && event.target.innerWidth <= 900) ? 2 :
        (event.target.innerWidth >= 901 && event.target.innerWidth <= 1400) ? 3 : 4;
  }
  /**gets all movies since the genres are within the movie objects and then creates a new set of genres so there are no repeats */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      let extractGenre = this.movies.map((movie) => movie.genre.name)
      this.genres = [...new Set(extractGenre)];
      this.filteredGenres = this.genres
      return (this.genres, this.filteredGenres, this.movies);
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    });
  }

}

