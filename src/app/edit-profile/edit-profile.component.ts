import { Component, OnInit, Inject, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProfileComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string,
      email: string,
      birthday: any,
    }) { }

  @Input() userData = {
    username: this.data.username,
    password: '',
    email: this.data.email,
    birthday: this.data.birthday,
  }

  ngOnInit(): void {
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'custom-dialog-container'
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    if (this.userData.username !== '' && this.userData.password !== '' && this.userData.email !== '') {
      this.fetchApiData.updateProfile({
        username: this.userData.username,
        password: this.userData.password,
        email: this.userData.email,
        birthday: this.userData.birthday,
      }).subscribe((result) => {
        this.dialogRef.close();
        this.snackBar.open('Your profile was updated successfully', 'OK', {
          duration: 2000
        });
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    } else {
      this.snackBar.open('Please enter your username, password, and email before updating', 'OK', {
        duration: 3000
      });
    }
  }

}
