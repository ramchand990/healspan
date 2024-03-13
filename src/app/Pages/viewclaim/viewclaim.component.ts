import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogModel, ConfirmLogoutComponent } from 'src/app/Shared/Components/confirm-logout/confirm-logout.component';
import { MessageDialogComponent, MessageDialogModel } from 'src/app/Shared/Components/message-dialog/message-dialog.component';
import { environment } from 'src/environments/environment';
import { claimService } from '../creatclaim/claimservice';
import { QuerypopupComponent } from './querypopup/querypopup.component';
import { TpaApprovalComponent } from './tpa-approval/tpa-approval.component';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-viewclaim',
  templateUrl: './viewclaim.component.html',
  styleUrls: ['./viewclaim.component.css']
})
export class ViewclaimComponent implements OnInit {
  public browserRefresh: boolean;
  claimdetailData: any;
  claimInfo: any;
  patientinfo: any; medicalInfo: any; insuranceInfo: any;
  InitialDoc: any; EnhancmentDoc: any; DischargeDoc: any; FinalDoc: any;
  finalClaim: any;
  statusmaster: any;
  insuaranceCompanyDetail: any;
  RPADetail: any;
  TPADetail: any
  allmasterData: any;
  claimdata: any;
  IsEdit: boolean = false;
  claimStageId: any;
  claimStageLinkId: any;
  Isapproved: boolean = false;
  path: any;
  dropdownSettings: any;
  //QuestionList
  questionList: any = [];
  selectedItems: any = [];
  manadtorydoc: any;
  documentArray: any = [];
  selected: number[];
  Review: any;
  numberArray: any[];

  ClaimInfo: any;
  ClaimAssignmentQuery: any;
  ClaimAssignmentTpa: any;
  IsApprove: boolean = false;
  TpaForm!: FormGroup;
  QueryForm!: FormGroup;
  public sessionStorage = sessionStorage;
  currentstatus: any;
  tpaClaimAmount: any;
  isChecked = "on";
  IsSettled: boolean = false;
  tpaClaimNo: any;
  StageName: any;
  isReadOnly: boolean = false;
  initialTpaQueries: any = [];
  ActiveTpaQuerry: any = [];
  outputText: any;
  Datetime: any;
  previewDoc: any;
  public environment = environment;
  documentBody: any;
  DocumentType: any
  docClick:boolean=false
  urlSafe: SafeResourceUrl;


  initialQuery: any; enhanceQuery: any; dischargeQuery: any; finalclaimQuery: any;
  initialTpaQuery: any; enhanceTpaQuery: any; dischargeTpaQuery: any; finalclaimTpaQuery: any
  constructor(private api: ApiService, private fb: FormBuilder, private httpClient: HttpClient,
    private dataservice: DataService, private router: Router, public datepipe: DatePipe,public sanitizer: DomSanitizer,
    private claimService: claimService, private dialog: MatDialog, private commonservice: CommonserviceService) {

  }
  ngOnInit(): void {
    this.TpaForm = this.fb.group({
      IsQueryGroup: [''],
      IsApproveGroup: [''],
      IsRejectGroup: [''],
      TpaClaimNo: [null, Validators.required],
      ApproveAmount: [0,],
      SettledAmount: [null,],
      Remark: [null, Validators.required]
    })




    this.QueryForm = this.fb.group({
      QueryRemark: [''],
      RevDoc: ['']
    })

    this.currentstatus = "Query"

    this.dataservice.currentclaimdetails_data.subscribe({
      next: (res) => {
        this.claimdata = res;
        if (this.claimdata.length == 0) {
          let activeDashboard = sessionStorage.getItem("usertype");
          if (activeDashboard == '2') {
            this.router.navigate(['hdashboard'])
          } else {
            this.router.navigate(['rdashboard'])
          }
        }
        // console.log("claim", this.claimdata)
        this.Assignclaimdata(this.claimdata);
       
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
      }
    });

    if (this.insuranceInfo?.tpaId != null && this.insuranceInfo.tpaId != undefined) {
      this.tpaDropdown(this.insuranceInfo.tpaId)
   }

  }


  tpaDropdown(id: any) {
    this.api.getService('healspan/claim/get-tpawise-master-details/',id).subscribe({
      next: (data) => {
     
        this.manadtorydoc = data["mandatory_documents_mst"];
        this.dataservice.UpdateTpa_Data(data);
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
      }
      
    })
  }


  onItemSelect(event: any) {
    // console.log(event.target.value)
  }

  docopen(docid: any,docname:any) {
    // window.location.href = environment.baseUrl + 'healspan/claim/download/' + docid;
    this.api.download("healspan/claim/download/",docid ).subscribe({
      next: (response) => {
        let result=response.headers.get('content-disposition').slice(21)
        if (result.at(0) === '"' && result.at(-1) === '"') {
         result = result.slice(1, -1);
         
       }
       let fileName=result
         console.log(fileName)
        let blob:Blob=response.body as Blob;
        let a=document.createElement('a');
        a.download=fileName;
        a.href=window.URL.createObjectURL(blob);
        a.click()

       console.log(response)
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
      }
    })
  }



  Assignclaimdata(data: any) {

    let activeusertype = sessionStorage.getItem("usertype");
    this.ClaimInfo = data.claimInfo;
    this.tpaClaimNo = data.claimInfo?.tpaClaimNumber
    if (this.tpaClaimNo != null) {

      this.TpaForm.controls["TpaClaimNo"].setValue(this.tpaClaimNo)
    }
    this.statusmaster = data.statusName;
    this.claimdetailData = data;
    this.StageName = data.claimStageMstName
    this.claimStageLinkId = data.id;
    this.claimInfo = data.claimInfo;
    this.patientinfo = data.patientInfo;
    // console.log(this.patientinfo)

    this.medicalInfo = data.medicalInfo;
    this.insuranceInfo = data.insuranceInfo;

   

    if (data.claimAssignment != null && data.claimAssignment["assignCommentDto"]?.length > 0) {
      this.ClaimAssignmentQuery = data.claimAssignment["assignCommentDto"];

      this.initialQuery = this.ClaimAssignmentQuery.filter((a: any) => a.claimStageMstId == 1);
      this.enhanceQuery = this.ClaimAssignmentQuery.filter((a: any) => a.claimStageMstId == 2);
      this.dischargeQuery = this.ClaimAssignmentQuery.filter((a: any) => a.claimStageMstId == 3);
      this.finalclaimQuery = this.ClaimAssignmentQuery.filter((a: any) => a.claimStageMstId == 4);
    }

    if (data.claimAssignment != null && data.claimAssignment["tpaQueryDto"]?.length > 0) {
      this.ClaimAssignmentTpa = data.claimAssignment["tpaQueryDto"];

      this.initialTpaQuery = this.ClaimAssignmentTpa.filter((a: any) => a.claimStageMstId == 1);
      this.enhanceTpaQuery = this.ClaimAssignmentTpa.filter((a: any) => a.claimStageMstId == 2);
      this.dischargeTpaQuery = this.ClaimAssignmentTpa.filter((a: any) => a.claimStageMstId == 3);
      this.finalclaimTpaQuery = this.ClaimAssignmentTpa.filter((a: any) => a.claimStageMstId == 4);
    }
    this.claimStageId = data.claimStageMstId;
    this.questionList = data["questionAnswerList"];

    if (data["documentList"] != null) {
      this.InitialDoc = data["documentList"]?.filter((a: any) => a.claimStageMstId == 1);
      this.EnhancmentDoc = data["documentList"]?.filter((a: any) => a.claimStageMstId == 2);
      this.DischargeDoc = data["documentList"]?.filter((a: any) => a.claimStageMstId == 3);
      this.FinalDoc = data["documentList"]?.filter((a: any) => a.claimStageMstId == 4);

    }

    if (activeusertype == '2' || activeusertype=='3') {
      this.IsEdit = true;
    } else {
      let LoggedInId = sessionStorage.getItem("LoggedInId");
      if (this.claimInfo.userId == LoggedInId) {
        this.IsEdit = true;
      }
    }

    if (this.claimdetailData?.statusName == "Submitted") {
      this.IsEdit = false;
    }

    if (this.claimdetailData?.statusName == "Submitted") {
      this.Isapproved = true

    } else {
      this.Isapproved = false
    }

  }

  tabclick(name: any) {
    // console.log(name)
    if (name == 'Initial') {
      this.ActiveTpaQuerry = this.initialTpaQuery
      // this.getTooltipText(this.initialTpaQuery)
    }
    else if (name == 'Enhancement') {
      this.ActiveTpaQuerry = this.enhanceTpaQuery
      // this.getTooltipText(this.enhanceTpaQuery)
    }
    else if (name == 'Discharge') {
      this.ActiveTpaQuerry = this.dischargeTpaQuery
      // this.getTooltipText(this.dischargeTpaQuery)
    }
    else if (name == 'Final Claim') {
      this.ActiveTpaQuerry = this.finalclaimTpaQuery
      // this.getTooltipText(this.finalclaimQuery)
    }
  }


  getTooltipText() {
    this.outputText = '';
    if(this.ActiveTpaQuerry !=null){
      for (const element of this.ActiveTpaQuerry) {
        this.Datetime = this.datepipe.transform(element.createdDateTime, 'dd/MM/YYYY hh:mm a')
        this.outputText += ` Remark:   ${element.remarks}  DateTime:   ${this.Datetime} `;
      }
      return this.outputText
    }
   
  }


  GotoClaim(claimStageLinkId: number) {

    let stage = this.claimdetailData?.claimStageMstName;
    let url = '/createclaim/' + stage;
    this.dataservice.updateclaimdetails_data(this.claimdata);
    this.router.navigate([url]);
  }

  approveClick() {
    const message = `Do you want to approve?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmLogoutComponent, {

      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        let param = {
          "claimId": this.claimInfo.id,
          "stageId": this.claimdetailData.claimStageMstId,
          "flowType": "HEALSPAN_USER_APPROVED_CLAIM",
          "transferComment": "dummy comment"
        }
        this.api.postService(environment.baseUrl + "healspan/claim/pushclaimdatatorpa", param).subscribe({
          next: (data) => {
            if (data) {
              const message2 = `Claim details submission status to RPA success`;
              const dialogData = new MessageDialogModel("Confirm Action", message2);
              const dialogRef2 = this.dialog.open(MessageDialogComponent, {
                data: dialogData
              });
              setTimeout(() => {
                dialogRef2.close();
                this.commonservice.redirecttoactivedashboard();

              }, 2000)
            }
          },
          error: (err: HttpErrorResponse) => {
            this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
          }

        })
      }
    })

  }

  GotoNextStage(claimstageId: any) {
    let userId = sessionStorage.getItem("LoggedInId");
    if (claimstageId == 2) {
      this.path = "Enhancement"
    }
    else if (claimstageId == 3) {
      this.path = "Discharge"
    }
    else if (claimstageId == 4) {
      this.path = "Final Claim"
    }
    let param = {
      "claimStageLinkId": this.claimStageLinkId,
      "claimStageId": claimstageId,
      "statusId": 1,
      "userId": userId
    }
    const message = `Do you want change the stage?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmLogoutComponent, {

      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.api.post('healspan/claim/updatestage', param).subscribe({
          next: (res) => {
            // console.log("updatestage response", res)
            if (res.responseStatus == "SUCCESS") {
              this.GotoNewClaim(this.path, res.claimStageLinkId)
            }
          },
    
          error: (err: HttpErrorResponse) => {
            this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
          }
        })
      }})
   
  }

  GotoNewClaim(stage: any, claimStageLinkId: any) {

    let url = '/createclaim/' + stage;
    this.api.getService("healspan/claim/retrieveclaim/" ,claimStageLinkId).subscribe({
      next: (data) => {
        this.dataservice.updateclaimdetails_data(data);
        this.router.navigate([url]);
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
      }
    })
  }

  onSend(formData: any) {
    this.numberArray = this.selected.map(Number);

    let param = {
      "claimId": this.ClaimInfo.id,
      "stageId": this.claimStageId,
      "transferComment": this.Review,
      "documentIds": this.numberArray,
      "flowType": "HEALSPAN_USER_QUERIED_AGAINST_CLAIM"
    }

    this.claimService.Query(param)
      .subscribe({
        next: (res: any) => {
          if (res?.responseStatus == "SUCCESS") {
            const message2 = `Query submitted succesfully`;
            const dialogData = new MessageDialogModel("Confirm Action", message2);
            const dialogRef3 = this.dialog.open(MessageDialogComponent, {

              data: dialogData
            });
            setTimeout(() => {
              dialogRef3.close();
              this.commonservice.redirecttoactivedashboard();
            }, 2000)
          }
          else {
            this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
          }
        },
        error: (err: HttpErrorResponse) => {
          this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
        }
      })
  }


  ReviewDocSelect(event: any) {
    this.documentArray = [];
    for (let i = 0; i < event.value.length; i++) {
      const dvar = this.manadtorydoc.filter((x: any) => x.name == event.value[i]);
      // console.log("documentArray" + dvar)
    }
  }


  OnDownload() {
    // window.location.href = environment.baseUrl + 'healspan/claim/downloadZip/' + this.claimInfo.id

    this.api.download("healspan/claim/downloadZip/",this.claimInfo.id ).subscribe({
      next: (response) => {
        let result=response.headers.get('content-disposition').slice(21)
       if (result.at(0) === '"' && result.at(-1) === '"') {
        result = result.slice(1, -1);
        
      }
      let fileName=result
        console.log(fileName)
        let blob:Blob=response.body as Blob;
        let a=document.createElement('a');
        a.download=fileName ;
        a.href=window.URL.createObjectURL(blob);
        a.click()

       console.log(response)
      },
      error: (err: HttpErrorResponse) => {
        this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
      }
    })
   


  }


  OnopenQuery() {
    this.dialog.open(QuerypopupComponent, {
      height: "700px",
      width: "700px",
      data: this.manadtorydoc
    });

  }

  TpaClick() {
    this.dialog.open(TpaApprovalComponent, {
      height: "500px",
      width: "600px",
      data: this.manadtorydoc
    });

  }

  approveChange(event: any, status: any) {
    this.currentstatus = status

    this.TpaForm.controls["Remark"].reset();
    this.TpaForm.controls["SettledAmount"].reset();
    this.TpaForm.controls["SettledAmount"].clearValidators();
    this.TpaForm.controls["SettledAmount"].updateValueAndValidity();
    if (event.target.value == "on") {
      this.TpaForm.controls["ApproveAmount"].setValidators([Validators.required]);
      this.TpaForm.controls["ApproveAmount"].updateValueAndValidity();
      this.IsApprove = true;
      this.IsSettled = false
    }

  }

  queryChange(event: any, status: any) {
    this.currentstatus = status
    this.TpaForm.controls["Remark"].reset();
    this.TpaForm.controls["ApproveAmount"].reset();
    this.TpaForm.controls["SettledAmount"].reset();
    this.TpaForm.controls["ApproveAmount"].clearValidators();
    this.TpaForm.controls["ApproveAmount"].updateValueAndValidity();
    this.TpaForm.controls["SettledAmount"].clearValidators();
    this.TpaForm.controls["SettledAmount"].updateValueAndValidity();

    if (event.target.value == "on") {
      this.TpaForm.controls["SettledAmount"].setValidators([Validators.required]);
      this.IsApprove = false;
      this.IsSettled = false
    }

  }

  rejectChange(event: any, status: any) {

    this.TpaForm.controls["Remark"].reset();
    this.TpaForm.controls["SettledAmount"].reset();
    this.TpaForm.controls["ApproveAmount"].reset();
    this.TpaForm.controls["ApproveAmount"].clearValidators();
    this.TpaForm.controls["ApproveAmount"].updateValueAndValidity();
    this.TpaForm.controls["SettledAmount"].clearValidators();
    this.TpaForm.controls["SettledAmount"].updateValueAndValidity();
    this.currentstatus = status
    // console.log(event.target.value)
    if (event.target.value == "on") {
      this.IsApprove = false;
      this.IsSettled = false
    }
  }

  settleChange(event: any, status: any) {
    this.currentstatus = status

    this.TpaForm.controls["Remark"].reset();
    this.TpaForm.controls["ApproveAmount"].reset();
    this.TpaForm.controls["ApproveAmount"].clearValidators();
    this.TpaForm.controls["ApproveAmount"].updateValueAndValidity();
    if (event.target.value == "on") {
      this.TpaForm.controls["SettledAmount"].setValidators([Validators.required]);
      this.TpaForm.controls["SettledAmount"].updateValueAndValidity();
      this.IsApprove = false;
      this.IsSettled = true
    }
  }

  OnTpaSubmit(formData: any) {

    let param = {

      "claimId": this.ClaimInfo.id,
      "stageId": this.claimStageId,
      "claimNumber": this.TpaForm.get("TpaClaimNo")?.value,
      "transferComment": this.TpaForm.get("Remark")?.value,
      "status": this.currentstatus,
      "approvedAmount": this.TpaForm.get("ApproveAmount")?.value,
      "settledAmount": this.TpaForm.get("SettledAmount")?.value,
    }
    this.claimService.TpaAction(param)
      .subscribe({
        next: (data: any) => {
          if (data?.responseStatus == "SUCCESS") {
            const message2 = `TPA action submitted`;
            const dialogData = new MessageDialogModel("Confirm Action", message2);
            const dialogRef2 = this.dialog.open(MessageDialogComponent, {
              data: dialogData
            });
            setTimeout(() => {
              dialogRef2.close();
              this.commonservice.redirecttoactivedashboard();

            }, 2000)
          }


        },
        error: (err: HttpErrorResponse) => {
          this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
        }

      })
  }

  get M() { return this.TpaForm.controls; }
  get Q() { return this.QueryForm.controls; }


  PreviewDoc(id: any) {
    this.docClick=true
   
    // this.httpClient.get("assets/data/PreviewDoc.json").subscribe((data:any) =>{
    //   this.previewDoc=data["Document"]
    //   console.log(this.previewDoc)
    // })

    // this.api.getService('healspan/claim/preview-document/' + id).subscribe((data: any) => {

    // })
    this.previewDoc='http://13.235.113.71:2023/healspan/claim/preview-document/'+id;

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewDoc);
    //   this.DocumentType =data["mimeType"];
    //     this.documentBody =data["body"];
       
    //   this.previewDoc="data:"+this.DocumentType+","+this.documentBody
    //   console.log(this.previewDoc)
    // })



  }


  numericOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  }

}

