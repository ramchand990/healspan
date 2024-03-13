import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-set-timeoutpopup',
  templateUrl: './set-timeoutpopup.component.html',
  styleUrls: ['./set-timeoutpopup.component.css']
})
export class SetTimeoutpopupComponent implements OnInit {

  constructor(private router: Router,private dialogRef: MatDialogRef<SetTimeoutpopupComponent>,) { }

  ngOnInit(): void {
  }

  onokClick(response:boolean){
    this.router.navigate(['/login']);
    this.dialogRef.close(response);
  }

  onNoThanks(){
    window.location.reload();
  }
}
