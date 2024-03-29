import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu'
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { DirectorListComponent } from './director-list/director-list.component';
import { GenreViewComponent } from './genre-view/genre-view.component';
import { DirectorViewComponent } from './director-view/director-view.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'genres', component: GenreListComponent },
  { path: 'directors', component: DirectorListComponent },
  { path: 'movie-view', component: MovieViewComponent },
  { path: 'genre-view', component: GenreViewComponent },
  { path: 'director-view', component: DirectorViewComponent },
  { path: 'user', component: ProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfileComponent,
    DeleteConfirmationComponent,
    EditProfileComponent,
    MovieViewComponent,
    GenreListComponent,
    DirectorListComponent,
    GenreViewComponent,
    DirectorViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
