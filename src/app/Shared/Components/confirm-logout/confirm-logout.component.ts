import { Component, OnInit,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.css']
})
export class ConfirmLogoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) { 
      this.title = data.title;
      this.message = data.message; }
  
  title: string;
  message: string;
  ngOnInit(): void {
  }


  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}

