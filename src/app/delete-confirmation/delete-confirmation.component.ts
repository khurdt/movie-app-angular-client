import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    public snackBar: MatSnackBar,
    public Router: Router,) { }
  username = localStorage.getItem('user');

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteUser(): void {
    this.fetchApiData.deleteProfile().subscribe((resp: any) => {
      this.snackBar.open('goodbye', 'OK', {
        duration: 2000
      });
      this.Router.navigate(['welcome']);
      console.log(resp);
      this.dialogRef.close();
    }, (resp) => {
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
      console.log(resp);
    });
  }

}
