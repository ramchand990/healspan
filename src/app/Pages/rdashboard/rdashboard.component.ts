import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-rdashboard',
  templateUrl: './rdashboard.component.html',
  styleUrls: ['./rdashboard.component.css']
})
export class RdashboardComponent implements OnInit {
  spaData: any = [];
  slaCount: any = [];
  healspandata: any;
  hospitalData: any;
  ClosedData: any;
  searchText: any = "";
  FirstBucket: any = [];
  SecondBucket: any = [];
  ThirdBucket: any = [];
  FourthBucket: any = [];
  FifthBucket: any = [];
  LoggedInId:any;
  constructor(private apiservice: ApiService, private router: Router, private dataservice: DataService) { }

  ngOnInit(): void {
    // this.api.getService("assets/data/sla.json").subscribe((data:any) =>{
    //   // console.log("sdsd",data);
    //   this.spaData = data["statusdatalist"]
    //   this.healspandata = data["healspanlist"]
    //   this.hospitalData = data["hospitallist"]
    //   this.ClosedData = data["closeslist"]
    //   console.log("spa",this.spaData);
    // })
     this.LoggedInId = sessionStorage.getItem("LoggedInId");
    this.apiservice.getService("healspan/claim/healspanuserdashboarddata/",this.LoggedInId).subscribe({
      next: (data) => {
      this.healspandata = data["reviewerClaimsDataList"];
      this.hospitalData = data["hospitalClaimsDataList"];
      this.ClosedData = data["closedClaimsDataList"]
     this.spaData = data["reviewerClaimsDataList"]
     this.createBucket(this.healspandata)
    },
    error: (err: HttpErrorResponse) => {
      this.dataservice.openSnackBar({'data':environment.ErrorMessage})
      // console.log("HttpErrorResponse" + err.status);
      // alert("Something Went Wrong!")
    }

  })

      //alert(this.spaData.green)
      //this.aprrovalDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status == "Approved");
      //this.pendingDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status != "Approved"); 
    
  // (err: HttpErrorResponse) => {
  //   console.log("HttpErrorResponse" + err.status);
  //   //alert("Something Went Wrong -" + err.status)       
  // })


}

GotoClaim(claimID: any) {
  //let url = 'viewclaim;
  this.apiservice.getService("healspan/claim/retrieveclaim/",claimID).subscribe( {
    next:(data)=>{
      this.dataservice.updateclaimdetails_data(data);
      this.router.navigate(['viewclaim']);
    },
    error: (err: HttpErrorResponse) => {
      console.log("HttpErrorResponse" + err.status);
      alert("Something Went Wrong!")
    }
  });
  
}


createBucket(list: any) {
  this.FirstBucket = [];
  this.SecondBucket = [];
  this.ThirdBucket = [];
  this.FourthBucket = [];
  this.FifthBucket = [];

  list?.forEach((element: any) => {
    // console.log("tu", element.slaPercent)
    if (element.slaPercent < 25) {
      this.FirstBucket.push(element)
    }
    if (element.slaPercent > 25 && element.slaPercent < 50) {
      this.SecondBucket.push(element)
    }
    if (element.slaPercent > 50 && element.slaPercent < 75) {
      this.ThirdBucket.push(element)
    }
    if (element.slaPercent > 75 && element.slaPercent < 100) {
      this.FourthBucket.push(element)
    }
    if (element.slaPercent > 100) {
      this.FifthBucket.push(element)
    }

  })
}

tabclick(name: any) {
  if (name == 'Hospital') {
    this.createBucket(this.hospitalData)
  }
  else if (name == 'Closed') {
    this.createBucket(this.ClosedData)
  }
  else if (name == 'Healspan') {
    this.createBucket(this.healspandata)

  }

}

Sla(value: any){
  if (value == 'FirstBucket') {
    let obj = {
      "name": 'SLA < 25%',
      "data": this.FirstBucket
    }

    this.dataservice.Sla_data(obj)
    let url = '/slastatus';
    this.router.navigate([url]);
  }
  else if (value == 'SecondBucket') {
    let obj = {
      "name": 'SLA 25%-50%',
      "data": this.SecondBucket
    }
    this.dataservice.Sla_data(obj)
    let url = '/slastatus';
    this.router.navigate([url]);
  }
  else if (value == 'ThirdBucket') {
    let obj = {
      "name": 'SLA 50%-75%',
      "data": this.ThirdBucket
    }
    this.dataservice.Sla_data(obj)
    let url = '/slastatus';
    this.router.navigate([url]);
  }
  else if (value == 'FourthBucket') {
    let obj = {
      "name": 'SLA 75%-100%',
      "data": this.FourthBucket
    }
    this.dataservice.Sla_data(obj)
    let url = '/slastatus';
    this.router.navigate([url]);
  }
  else if (value == 'FifthBucket') {
    let obj = {
      "name": 'SLA > 100%',
      "data": this.FifthBucket
    }
    this.dataservice.Sla_data(obj)
    let url = '/slastatus';
    this.router.navigate([url]);
  }

}

 

}
