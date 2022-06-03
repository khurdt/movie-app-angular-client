import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
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
    private dialogAll: MatDialog,
    public snackBar: MatSnackBar,
    public Router: Router,
  ) { }

  username = localStorage.getItem('user');

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteUser(): void {
    this.dialogAll.closeAll();
    this.snackBar.open('your account has been deleted', 'OK', {
      duration: 2000
    })
    this.Router.navigate(['welcome']).then(() => {
      this.fetchApiData.deleteProfile().subscribe((resp) => { console.log(resp) }, (resp) => { console.log(resp) });
    }).then(() => {
      localStorage.clear();
    })
  }

}
