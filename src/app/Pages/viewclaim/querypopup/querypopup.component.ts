import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-querypopup',
  templateUrl: './querypopup.component.html',
  styleUrls: ['./querypopup.component.css']
})
export class QuerypopupComponent implements OnInit {
  toppings = new FormControl('');
  constructor(public dialogRef: MatDialogRef<QuerypopupComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }
  input: string;
MandatoryData:any;
  ngOnInit(): void {


    this.MandatoryData=this.data
    // console.log(this.MandatoryData)
  }

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
