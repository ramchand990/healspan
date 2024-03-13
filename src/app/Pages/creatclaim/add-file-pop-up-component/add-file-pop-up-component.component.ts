import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-add-file-pop-up-component',
  templateUrl: './add-file-pop-up-component.component.html',
  styleUrls: ['./add-file-pop-up-component.component.css']
})
export class AddFilePopUpComponentComponent implements OnInit {
  dataSource = new MatTableDataSource<Element>();
  OtherCostData:any = [];
  ELEMENT_DATA: any;
  mandatoryDocs:any;
  selected:number[];
  numberArray:any[];
  constructor( @Inject(MAT_DIALOG_DATA) private data: any,public dialogRef: MatDialogRef<AddFilePopUpComponentComponent>,) { }

  ngOnInit(): void {
    this.ELEMENT_DATA = this.data;
    // console.log("tt" ,this.ELEMENT_DATA)
    this.dataSource =  new MatTableDataSource(this.ELEMENT_DATA);
  }
  ReviewDocSelect(event:any){

  }

  onOk(){
    this.numberArray=this.selected.map(Number);
    // console.log(this.numberArray)
    this.dialogRef.close(this.numberArray);
  }
}