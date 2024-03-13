import { Component, OnInit,Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from "@angular/material/snack-bar";
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})

export class SnackbarComponent implements OnInit {
  ErrorMessage:any
  constructor(public sbRef: MatSnackBarRef<SnackbarComponent>,@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
    // this.ErrorMessage=data;
    // console.log("trt",this.ErrorMessage)
  }

  ngOnInit(): void {
   
  }
  dismiss(event:any){
    this.data.preClose()
    // event.preventDefault();
  }

}
