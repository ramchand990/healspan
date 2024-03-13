import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { FilterPipe } from 'src/app/Shared/Pipes/filter.pipe';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-hdashboard',
  templateUrl: './hdashboard.component.html',
  styleUrls: ['./hdashboard.component.css']
})
export class HdashboardComponent implements OnInit {
  statusDetail: any;
  aprrovalDataList:any;
  pendingDataList:any;
  closedDataList:any;

  currentuserdata:any;
  LoggedInId:any;
  @ViewChild('modalChoice3') modalChoice3 :any;
  searchText:any="";
  showPending:boolean= true;
  showApproval:boolean= false;
  showClosed:boolean = false;
  
  ActiveTabName:any="Pending";
  hospitalName:any;
  public sessionStorage = sessionStorage;

  constructor(private router: Router,private apiservice:ApiService,
  private dataservice : DataService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
   this.dataservice.currentuser_data.subscribe((res) =>{
    // console.log("currentuserdata" + res);
    this.currentuserdata = res
   })
   this.GetData();
  }


  GetData(){
    this.LoggedInId = sessionStorage.getItem("LoggedInId");
    this.apiservice.getService("healspan/claim/hospitaluserdashboarddata/",this.LoggedInId).subscribe({
      next: (data) => {
        if(data!= null){
          this.aprrovalDataList = data["claimStageApprovalCount"];
          this.pendingDataList = data["claimStagePendingCount"];
          this.closedDataList = data["claimStageClosedCount"];
        }
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({'data':environment.ErrorMessage})
      }
    })
     
  }


  // //-----------------Bind all dropdown
  // bindDropdown() {
  //   this.apiservice.getService('healspan/claim/admin/masters').subscribe((data: any) => {
  //     let res = data["hospital_mst"];
  //     let id = sessionStorage.getItem('hospitalMstId');
  //     this.hospitalDetail = res.filter((a:any)=> a.id == id);
      
  //   })
  // }


  GotoClaim(stage:any,claimStageLinkId:any){
      let url = '/createclaim/'+stage;
      this.apiservice.getService("healspan/claim/retrieveclaim/",claimStageLinkId).subscribe( {
        next: (data) => {
          this.dataservice.updateclaimdetails_data(data);
          this.router.navigate(['viewclaim']);
        },
        error: (err: HttpErrorResponse) => {
          this.dataservice.openSnackBar({'data':environment.ErrorMessage})
        }
      },)
  }

  Gotoroutes(path:any){
    const boxes = Array.from(
      document.getElementsByClassName('modal-backdrop') as HTMLCollectionOf<HTMLElement>,
    );   
    boxes.forEach(box => {
      box.style.visibility = 'hidden';
      box.style.zIndex = '-999';
    });
    this.modalChoice3.nativeElement.click();
    let currentUrl = '/createclaim/'+path;
    this.router.navigate([currentUrl]); 
  }


  tabclick(name:any){
    this.ActiveTabName=name
    if(name == "Pending"){
      this.showPending = true;
      this.showApproval = false;
      this.showClosed = false;
    }else if(name == "Approval"){
      this.showPending = false;
      this.showApproval = true;
      this.showClosed = false;
    }else{
      this.showPending = false;
      this.showApproval = false;
      this.showClosed = true;
    }

  }


}
