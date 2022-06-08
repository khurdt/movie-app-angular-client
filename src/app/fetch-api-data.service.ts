import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

/**Declaring the api url that will provide data for the client app */
const apiUrl = 'https://kh-movie-app.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  /**Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
  */
  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
  ) { }

  movieData: any = {};
  object: any = {};

  /**Making the api call for the POST user registration endpoint
   * @params user's account info
  */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  /**Making the api call for the POST user login endpoint
   * @params user's Credentials
  */
  public userLogIn(userCredentials: any): Observable<any> {
    this.snackBar.open('Attempting to Login...', 'OK', {
      duration: 2000
    });
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      map(this.extractResponseUserToken),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the GET single movie endpoint
   * @params movie title
  */
  public getMovieCard(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${movieTitle}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the GET all users endpoint*/
  public getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the GET all movies endpoint*/
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the GET single director endpoint
   * @params director's name
  */
  public getDirectorCard(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `director/${directorName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the GET single genre endpoint
    * @params genre's name
   */
  public getGenreCard(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genre/${genreName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the GET single user endpoint*/
  public getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the PUT single user endpoint
    * @params user's account info
   */
  public updateProfile(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**Making the api call for the DELETE single user endpoint*/
  deleteProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**Making the api call for the POST single favorite movie endpoint*/
  public addFavoriteMovie(movieID: number): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/` + username + `/movies/${movieID}`, { 'jwt': token }, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }
  /**Making the api call for the DELETE single favorite movie endpoint*/
  public removeFavoriteMovie(movieID: number): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/` + username + `/movies/${movieID}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }
  /**storing single movie object*/
  public storeSingleMovieData(movie: any): any {
    this.movieData = movie;
  }
  /**returning single movie object*/
  public getSingleMovieData(): void {
    return this.movieData
  }
  /**storing genre/director object*/
  public storeSingleObject(object: any): any {
    this.object = object;
  }
  /**returning genre/director object*/
  public getSingleObject(): void {
    return this.object
  }
  /**after log in is successfull, extract token and username and store it in local storage*/
  private extractResponseUserToken(res: any): any {
    const data = res;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.username);
    return data || {};
  }
  /**after any api request, return body of data*/
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  /**if error, instead of data, return error*/
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
