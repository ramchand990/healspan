import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hospitalName: any;
  aboutusData: any;
  address: any;
  hospitalId: any;
  GstNum: any;
  EmailId: any;
  hospitalMstId: any;
  hospitalDetail: any;
  AvisData: any;
  boardlineNumber: any;
  usertype: any;
  LoggedInId: any
  contactDetails: any
  constructor(private api: ApiService,) { }

  ngOnInit(): void {
    let LoggedInId = sessionStorage.getItem("LoggedInId");
    // console.log(this.usertype)
    this.hospitalMstId = sessionStorage.getItem("hospitalMstId");
    this.api.getService('healspan/claim/get-master-details/',this.hospitalMstId).subscribe((data: any) => {
      // console.log(data)
      this.hospitalDetail = data["hospital_mst"];


      this.hospitalName = this.hospitalDetail.name;
      // console.log(this.hospitalName)
      this.aboutusData = this.hospitalDetail.about;
      this.address = this.hospitalDetail.address;
      this.hospitalId = this.hospitalDetail.hospitalId;
      this.GstNum = this.hospitalDetail.gstNum;
      this.EmailId = this.hospitalDetail.emailId;
      this.boardlineNumber = this.hospitalDetail.boardLineNumber
      this.contactDetails = this.hospitalDetail.contactDetails
    })

  }

}
