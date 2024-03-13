import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { DataService } from 'src/app/service/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sla-status',
  templateUrl: './sla-status.component.html',
  styleUrls: ['./sla-status.component.css']
})
export class SlaStatusComponent implements OnInit {
  slaList:any;
  SlaHeader:any[];
  searchText: any = "";
  constructor(private dataservice: DataService, private commonservice: CommonserviceService) { }

  ngOnInit(): void {
    this.dataservice.currentSla_data.subscribe({
      next:(res:any)=>{
        console.log(res)
        if (res) {
           this.slaList = res["data"];
           this.SlaHeader=res["name"];
        }
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({'data':environment.ErrorMessage})
        // console.log("HttpErrorResponse" + err.status);
        // alert("Something Went Wrong!")
      }
     
    })
  }

  goBack(){
    this.commonservice.redirecttoactivedashboard();
  }


}
