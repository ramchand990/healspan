import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { DataService } from 'src/app/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmLogoutComponent } from '../confirm-logout/confirm-logout.component';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Subscription, timer } from 'rxjs';
import { claimService } from 'src/app/Pages/creatclaim/claimservice';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: any = "";
  title: any = "Dashboard";
  NotifyData: any;
  dropdownData: any;
  badgeContent: any;
  NotifyID: any;
  timerSubscription: Subscription;
  checkNotifyData: any;
  ids: any = [];
  LoggedInId: any;
  dataread: any;
  lastName: any;
  firstName: any;
  constructor(private router: Router, private commonservice: CommonserviceService, private api: ApiService,
    private claimService: claimService, private authservice: AuthenticationService, private dataservice: DataService, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    // this.username = sessionStorage.getItem("userName");
    this.lastName = sessionStorage.getItem("lastName");
    this.firstName = sessionStorage.getItem("firstName");
    if (this.firstName == null) { this.firstName = '' };
    if (this.lastName == null) { this.lastName = '' };


    this.LoggedInId = sessionStorage.getItem("LoggedInId");
    this.title = sessionStorage.getItem("Header")
    if (this.title == null) {
      this.title = "Dashboard"
    }


    // timer(0, 10000) call the function immediately and every 10 seconds 
    this.timerSubscription = timer(0, 60000).pipe(
      map(() => {
        this.notification(); // load data contains the http request 
      })
    ).subscribe();


  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }


  notification() {
    this.LoggedInId = sessionStorage.getItem("LoggedInId");
    if (sessionStorage.getItem("jwttoken") != null) {
      this.api.getService('healspan/claim/getusernotification/',this.LoggedInId).subscribe((data: any) => {

        this.NotifyData = data;
        this.checkNotifyData = this.NotifyData[0]
      })
    }

  }

  Onreadall(status: string) {
    this.dataread = status
    // this.NotifyData.forEach((ele:any) => {
    //   this.ids.push(ele.id);
    // });

    let params = {
      'id': null,
      'userId': parseInt(this.LoggedInId),
      "clearAll": this.dataread
    }
    this.claimService.Notification(params)
      .subscribe({
        next: (res: any) => {
          if (res != null) {
            if (res.responseStatus == "SUCCESS") {
              this.notification()

            }
          }
        }

      })
  }

  OnNotificSelect(id: any, status: string) {
    this.dataread = status

    let filterdata: any = []
    filterdata = this.NotifyData.filter((a: any) => a.id == id);
    let claimstagelinkid: any;
    if (filterdata != null || filterdata != '' || filterdata.length > 0) {
      claimstagelinkid = filterdata[0]?.claimStageLinkId;
    }

    this.NotifyID = id
    let params = {
      'id': this.NotifyID,
      "userId": parseInt(this.LoggedInId),
      "clearAll": this.dataread
    }

    this.claimService.Notification(params)
      .subscribe({
        next: (res: any) => {
          if (res != null) {
            if (res.responseStatus == "SUCCESS") {
              this.notification();
              this.GotoClaim(claimstagelinkid)

            }
          }
        }

      })
  }


  GotoClaim(claimStageLinkId: any) {
    this.api.getService("healspan/claim/retrieveclaim/",claimStageLinkId).subscribe({
      next: (data) => {
        this.dataservice.updateclaimdetails_data(data);
        this.router.navigate(['viewclaim']);
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
      }
    },)
  }

  redirect() {
    if (this.title == "Profile") {
      window.location.reload();
    } else {

      this.commonservice.redirecttoactivedashboard();
    }
    // this.dataservice.currentuser_data.subscribe((res:any) =>{
    //   if(res[0].type=='huser'){
    //     this.router.navigate(['hdashboard'])

    //   }else{
    //     this.router.navigate(['rdashboard'])
    //   }
    // })

  }

  logout() {
    const message = `Are you sure you want to logout?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmLogoutComponent, {

      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        sessionStorage.clear();

        this.authservice.logout();
      }

      //this.router.navigate(['']);  
    })
  }




}
