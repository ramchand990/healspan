import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Validators, ReactiveFormsModule, FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, startWith, takeUntil } from "rxjs/operators"
import { ReplaySubject, Subject, throwError } from 'rxjs';
import { ActivatedRoute, Route } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { formatDate } from '@angular/common';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalpopupService } from 'src/app/Providers/modalpopup.service';
import { OthercostComponent } from './othercost/othercost.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { claimService } from './claimservice';
import { event } from 'jquery';
import { AddFilePopUpComponentComponent } from './add-file-pop-up-component/add-file-pop-up-component.component';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ConfirmDialogModel, ConfirmLogoutComponent } from 'src/app/Shared/Components/confirm-logout/confirm-logout.component';
import { LoadingComponent } from '../loading/loading.component';
declare function verificationForm(): any;
declare function nice_Select(): any;
@Component({
  selector: 'app-creatclaim',
  templateUrl: './creatclaim.component.html',
  styleUrls: ['./creatclaim.component.css']
})
export class CreatclaimComponent implements OnInit {
  @ViewChild('select') select: MatSelect;

  IsTypeOfAccident: boolean = false; IspassengerType: boolean = false; IsTypeOfVehicle: boolean = false;
  admissiondata: any; mobilenumber!: number;

  ClaimForm!: FormGroup; submitted = false; submitted2 = false; submitted3 = false; isEditable = false; ailmentList: any
  InsuaranceForm!: FormGroup;
  medicalForm!: FormGroup;
  userId: number = 0;
  title: string = "";
  body: string = "";
  claimformData: Array<any> = [];
  isLinear = false;
  barWidth: string = "0%";
  restest: any;
  selectedFiles!: FileList;
  message = '';
  currentFile!: File;
  maxDate = new Date();
  ClaimID: any
  date: any;
  minDateToFinish = new Subject<string>();
  minDate: any;

  dateSent: any;
  dateReceived: any;
  todaysdate: any;
  show: boolean = false;
  show2: boolean = false;
  doclist: any = []; displaydoclist: any = [];
  procedureDetail: any;
  GenderDetail: any;
  OtherCosts: any = [];
  roomsDetail: any;

  showAge: any

  file_data: any = ''; percentDone: any;
  filestatus: any; currentupload: any;
  ActiveStage: any;
  progress: any = 0;
  insuaranceCompanyDetail: any = [];
  RPADetail: any;
  TPADetail: any;
  specialityDetail: any;
  hospitalDetail: any;
  chronicillnessDetail: any;
  DiagnosisDetail: any; tpaDiagnosisDetail: any; tpaprocedureDetail: any; tpaRoomDetail: any;
  claimStageMaster: any = [];
  treatmentTypeDetails: any = [];

  patientSave: any = {};
  medicalSave: any = {};
  InsuaranceSave: any = {};
  // othercostarray: Array<number> = [];
  // othercostheader: any;
  claimdata: any = [];
  currentuserdata: any;
  IsGroups: boolean = false

  //------Response Field-------------------
  patientInfoResponse: any; medicalInfoResponse: any; insuranceInfoResponse: any; ruleInfoResponse: any;
  questioncostheader: any = []; Questions: any = []; answerparam: any = "";
  claimInfoID: any = null; claimStageId: any = null;
  diagnosis: any = ""; treatmentType: any = ""; procedure: any = ""; duration: any = ""; gender: any = ""
  DocumentIds: any = []; blob: any;
  isChecked: boolean = false; IsSaveSequentialQue: boolean = false;
  dialogRef!: MatDialogRef<any>;
  Othercostlist: any = [];
  LoggedInId: any;
  IsHospitaluser: boolean = true;
  othercostarray: any; Otherclist: any = [];
  visible: boolean = false;

  //
  patientMedicalInfoList: any = []; medicalAndChronicIllnessLink: any = [];
  mindate: any;
  pack: any;

  //New VARIBALES
  claimStageLinkId: any = null; patientInfoId: any = null; medicalInfoId: any = null; insuranceInfoId: any = null;
  docbutton: boolean = false;

  //Stage wise Mandatory Documents;
  manadtorydoc: any = []; initialDoc: any = []; enhanceDoc: any = []; dischargeDoc: any = []; finalDoc: any = [];
  patientAndOtherCostLink: any = [];
  //alredyUploaddoc: any = []; 
  selectedObjectsFromArray: any = [];
  IfmedicalForm: boolean = false;

  firstDiaDate: any;
  todaysDate: any;
  disabledItem: any;
  usertypeid: any
  checkboxValue = false;
  @ViewChild('modaldocument') modaldocument: any;
  displayStyle = "none";
  chronidisabled: boolean = false;
  TpaClaimNumber: any;
  typeSelected: string;
  healspanClaimNo: any;
  isLoading = false;
  HospitalMstID: any;
 
  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private httpClient: HttpClient, private route: ActivatedRoute, private spinnerservice: NgxSpinnerService,
    private dataservice: DataService, private commonservice: CommonserviceService,
    private modalPopupService: ModalpopupService, private claimService: claimService, private dialog: MatDialog) {
    this.typeSelected = 'ball-fussion';
    this.minDateToFinish.subscribe((r: any) => {
      this.minDate = new Date(r);
    })

  }
  protected _onDestroy = new Subject<void>();
  ngOnInit(): void {

    // this.spinnerservice.show();
    // setTimeout(() => {
    //   this.spinnerservice.hide();
    // }, 5000);

    let stagename = this.route.snapshot.params['stagename'];
    this.ActiveStage = stagename;
    this.LoggedInId = sessionStorage.getItem("LoggedInId");
    this.usertypeid = sessionStorage.getItem("usertype");
  
    nice_Select();
    verificationForm();
    this.DefineFormControls();
    this.firstDiaDate = new Date().toISOString().slice(0, 10);
    this.todaysdate = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + "  " + (new Date().getHours()) + ":" + (new Date().getMinutes());



    this.bindDropdown();

    this.date = new Date().toISOString().slice(0, 10);

    this.dataservice.currentuser_data.subscribe((res) => {
      console.log("currentuserdata" + res);
      this.currentuserdata = res;
      let hospitalMstId = sessionStorage.getItem("hospitalMstId");
      if (hospitalMstId != "null") {
        this.ClaimForm.controls['Hospital'].setValue(sessionStorage.getItem("hospitalName"));
        this.IsHospitaluser = true;

      } else {
        this.IsHospitaluser = false;
      }
    })

    this.dataservice.currentclaimdetails_data.subscribe((res: any) => {
      this.claimdata = res;
      // console.log("hh", this.claimdata)
      if (this.claimdata.length != 0) {

        this.AssignFormControlValues(this.claimdata)


      }
    });

    this.SetExtraFormValidation();

    this.todaysDate = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + "T" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + ":" + (new Date().getSeconds());


  }




  closepopup() {
    this.displayStyle = "none";
  }

  redirect() {
    this.commonservice.redirecttoactivedashboard();
  }

  DefineFormControls() {
    this.ClaimForm = this.fb.group({

      Fname: ['', Validators.required],
      Mname: [''],
      Lname: ['', Validators.required],
      MobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      PHUHID: ['', Validators.required],
      Gender: ['', Validators.required],
      DOB: ['', Validators.required],
      Age: ['', Validators.required],
      Stage: [this.ActiveStage,],
      patientprimaryInsured: [true],
      Hospital: ['', Validators.required],
      DateOfAdmission: ['', Validators.required],
      DateOfDischarge: ['', Validators.required],
      RoomCategory: ['', Validators.required],
      CostPD: [null, Validators.required],
      totalRC: [0,],
      OtherC: [0,],
      OtherCE: [0],
      // Procedure: ['',],
      InitialCE: [null, Validators.required],

      //enhance stage
      Enhancementestimate: [null,],

      //discharge stage
      FinalbillAmount: [null,],
      ClaimedAmount: [null,],

      //claimsubmission
      BillNumber: [null,],

    })

    this.medicalForm = this.fb.group({
      Procedures: [null, Validators.required],
      TreatmentType: [null, Validators.required],
      Provisionaldiagnosis: [null, Validators.required],
      Speciality: [null, Validators.required],
      Dateoffirstdiagnosis: [null, Validators.required],
      Pasthistoryofchronicillness: [""],
      Nameofthetreatingdoctor: [null, Validators.required],
      DrResgistrationnumber: [null, Validators.required],
      Qualificationofthetreatingdoctor: [null, Validators.required],
      Ages: ["",],
      Genders: ["",],
      Duration: ["",],
      Claim: ["",],
      Comment: [""],
    })

    this.InsuaranceForm = this.fb.group({
      InsuranceCompany: ['', Validators.required],
      TPAID: ['', Validators.required],
      TPAnumber: ['', Validators.required],
      PolicyHolder: [null],
      RelationOPH: ['', Validators.required],
      PolicyNumber: [null],
      IsGroupPolicy: [''],
      Groupcompany: [null],
      employeeId: [null],
      TPAClaimID: [null],
      InsuaranceFilterCtrl: []
    })

  }

  AssignFormControlValues(data: any) {
    // this.load()
    this.isLoading = true
    this.doclist = [];
    this.claimStageLinkId = data.id;
    this.claimInfoID = data.claimInfo.id;
    this.claimStageId = data.claimStageMstId;
    this.TpaClaimNumber = data.claimInfo.tpaClaimNumber;

    if (this.TpaClaimNumber != null) {
      this.InsuaranceForm.controls["TPAClaimID"].setValue(this.TpaClaimNumber)
    }
    sessionStorage.setItem("claimStageId", this.claimStageId)


    let patientInformationList = data.patientInfo;
    if (patientInformationList != null) {
      this.patientInfoId = data.patientInfo.id;
    }

    this.patientMedicalInfoList = data.medicalInfo;
    if (this.patientMedicalInfoList != null) {
      this.medicalInfoId = data.medicalInfo.id;
    }

    let patientInsuranceInfoList = data.insuranceInfo;
    if (patientInsuranceInfoList != null) {
      this.insuranceInfoId = data.insuranceInfo.id;
    }


    let dateBirth = patientInformationList.dateBirth;
    let AdmissionDate = patientInformationList.dateOfAdmission;
    let dischargeDate = patientInformationList.dateOfDischarge;


    if (patientInformationList != null) {
      this.ClaimForm.controls["Fname"].setValue(patientInformationList.firstName);
      this.ClaimForm.controls["Mname"].setValue(patientInformationList.middleName);
      this.ClaimForm.controls["Lname"].setValue(patientInformationList.lastname);
      this.ClaimForm.controls["RoomCategory"].setValue(patientInformationList.roomCategoryId);
      this.ClaimForm.controls["MobileNo"].setValue(patientInformationList.mobileNo);
      this.ClaimForm.controls["PHUHID"].setValue(patientInformationList.hospitalUhid);
      this.ClaimForm.controls["Gender"].setValue(patientInformationList.genderId);
      this.gender = patientInformationList.gender;
      this.showAge = patientInformationList.age;
      this.medicalForm.controls["Ages"].setValue(this.showAge);
      if (dateBirth != null) {
        this.ClaimForm.get("DOB")?.setValue(formatDate(dateBirth, 'yyyy-MM-dd', 'en'));
      }

      if (AdmissionDate != null) {
        this.ClaimForm.get("DateOfAdmission")?.setValue(AdmissionDate);
      }
      this.dateSent = AdmissionDate;
      if (dischargeDate != null) {
        this.ClaimForm.get("DateOfDischarge")?.setValue(dischargeDate);
      }

      this.ClaimForm.controls["CostPD"].setValue(patientInformationList.costPerDay);
      this.ClaimForm.controls["InitialCE"].setValue(patientInformationList.initialCostEstimate);

      this.ClaimForm.controls["Enhancementestimate"].setValue(patientInformationList.enhancementEstimate);
      this.ClaimForm.controls["BillNumber"].setValue(patientInformationList.billNumber);
      this.ClaimForm.controls["FinalbillAmount"].setValue(patientInformationList.finalBillAmount);
      this.ClaimForm.controls["ClaimedAmount"].setValue(patientInformationList.claimedAmount);
      this.ClaimForm.controls["patientprimaryInsured"].setValue(patientInformationList.primaryInsured);
      this.ClaimForm.controls["totalRC"].setValue(patientInformationList.totalRoomCost);

      if (patientInformationList.patientAndOtherCostLink != null && patientInformationList.patientAndOtherCostLink.length > 0) {
        this.OtherCosts = patientInformationList.patientAndOtherCostLink;
        this.Othercostlist = patientInformationList.patientAndOtherCostLink;

        this.patientAndOtherCostLink = patientInformationList.patientAndOtherCostLink;
      }

      this.ClaimForm.controls["OtherCE"].setValue(patientInformationList.otherCostsEstimate);

      this.ClaimForm.controls["Hospital"].setValue(patientInformationList.hospitalName);
      if (this.IsHospitaluser == false) {
        this.HospitalMstID = patientInformationList.hospitalId
      }


      this.ClaimForm.controls["PHUHID"].setValue(patientInformationList.patientUhid);
      this.medicalForm.controls["Genders"].setValue(patientInformationList.genderId);
      this.calculateDiffHours();
      this.InitialCeCalculate();

    }



    if (patientInsuranceInfoList != null) {
      this.InsuaranceForm.controls["TPAnumber"].setValue(patientInsuranceInfoList.tpaIdCardNumber);
      this.InsuaranceForm.controls["PolicyHolder"].setValue(patientInsuranceInfoList.policyHolderName);
      this.InsuaranceForm.controls["PolicyNumber"].setValue(patientInsuranceInfoList.policyNumber);
      this.InsuaranceForm.controls["Groupcompany"].setValue(patientInsuranceInfoList.groupCompany);
      this.InsuaranceForm.controls["TPAID"].setValue(patientInsuranceInfoList.tpaId);

      if (patientInsuranceInfoList?.tpaId != null && patientInsuranceInfoList?.tpaId != undefined) {
        this.tpaDropdown_withoutapicall()
      }


      this.InsuaranceForm.controls["InsuranceCompany"].setValue(patientInsuranceInfoList.insuranceCompanyId);
      this.InsuaranceForm.controls["RelationOPH"].setValue(patientInsuranceInfoList.relationshipId);
      this.InsuaranceForm.controls["IsGroupPolicy"].setValue(patientInsuranceInfoList.isGroupPolicy);

      if (patientInsuranceInfoList.isGroupPolicy == true) {
        this.IsGroups = true;
        this.InsuaranceForm.controls["Groupcompany"].setValidators([Validators.required]);
        this.InsuaranceForm.controls["employeeId"].setValidators([Validators.required]);
        this.InsuaranceForm.controls["Groupcompany"].updateValueAndValidity();
        this.InsuaranceForm.controls["employeeId"].updateValueAndValidity();
        this.IsGroups = true;
        this.InsuaranceForm.controls["employeeId"].setValue(patientInsuranceInfoList.groupCompanyEmpId)
      } else {

        this.IsGroups = false;
        this.InsuaranceForm.controls["Groupcompany"].reset();
        this.InsuaranceForm.controls["employeeId"].reset();

        this.InsuaranceForm.controls["Groupcompany"].setValidators([]);
        this.InsuaranceForm.controls["employeeId"].setValidators([]);

        this.InsuaranceForm.controls["Groupcompany"].clearValidators();
        this.InsuaranceForm.controls["Groupcompany"].updateValueAndValidity();
        this.InsuaranceForm.controls["employeeId"].clearValidators();
        this.InsuaranceForm.controls["employeeId"].updateValueAndValidity();
      }
    }

    if (this.patientMedicalInfoList != null) {
      this.medicalForm.controls["Nameofthetreatingdoctor"].setValue(this.patientMedicalInfoList.doctorName);
      this.medicalForm.controls["DrResgistrationnumber"].setValue(this.patientMedicalInfoList.doctorRegistrationNumber);
      this.medicalForm.controls["Qualificationofthetreatingdoctor"].setValue(this.patientMedicalInfoList.doctorQualification);
      this.medicalForm.controls["Comment"].setValue(this.patientMedicalInfoList.comments);
      this.medicalForm.controls["Speciality"].setValue(this.patientMedicalInfoList.specialityId);

      let diseases: any = []; let diseaseinfo: any;
      diseases.push(this.chronicillnessDetail);

      this.medicalAndChronicIllnessLink = [];
      this.selectedObjectsFromArray = [];

      if (data.medicalInfo.medicalAndChronicIllnessLink != null) {
        for (const element of data.medicalInfo.medicalAndChronicIllnessLink) {
          this.selectedObjectsFromArray.push(element.chronicIllnessMstName)
          if (this.selectedObjectsFromArray.length > 0) {
            this.checkboxValue = true;
          }
        }
        data.medicalInfo.medicalAndChronicIllnessLink.forEach((element: any) => {
          this.medicalAndChronicIllnessLink.push({
            "id": element.id,
          });
        });
      }

      this.medicalForm.controls["TreatmentType"].setValue(this.patientMedicalInfoList.treatmentTypeId);
      this.treatmentType = this.patientMedicalInfoList.treatmentTypeName;

      //documents
      this.displaydoclist = data["documentList"];
      if (this.displaydoclist != null) {
        if (this.displaydoclist.length > 0) {
          this.displaydoclist.forEach((element: any) => {
            this.doclist.push(element.documentsMstId)
          });
        }

      }
      this.medicalForm.controls["Provisionaldiagnosis"].setValue(this.patientMedicalInfoList.diagnosisId);
      this.medicalForm.controls["Procedures"].setValue(this.patientMedicalInfoList.procedureId);
      let dateofirstdiagDate = this.patientMedicalInfoList.dateOfFirstDiagnosis;

      if (dateofirstdiagDate != null) {
        this.medicalForm.get("Dateoffirstdiagnosis")?.setValue(formatDate(dateofirstdiagDate, 'yyyy-MM-dd', 'en'));
      }
    }
    this.IfmedicalForm = false;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);

  }

  get f() { return this.ClaimForm.controls; }
  get M() { return this.medicalForm.controls; }
  get I() { return this.InsuaranceForm.controls; }



  SetExtraFormValidation() {
    if (this.ActiveStage == 'Final Claim' || this.ActiveStage == 'Discharge') {
      this.ClaimForm.controls["FinalbillAmount"].addValidators(Validators.required);
      this.ClaimForm.controls["ClaimedAmount"].addValidators(Validators.required);

    }
  }




  openDialog() {
    if (this.claimInfoID == null) {
      this.OtherCosts.forEach((element: any) => {
        if (this.Otherclist.length != this.OtherCosts.length) {
          this.Otherclist.push({ id: element.id, name: element.name, value: 0 });
        }
      });
    } else {
      this.patientAndOtherCostLink.forEach((element: any) => {
        if (this.Otherclist.length != this.OtherCosts.length) {
          this.Otherclist.push({ id: element.id, name: element.otherCostsMstName, value: element.amount });
        }
      });
      this.OtherCosts.forEach((element: any) => {
        const data = this.Otherclist.find((x: any) => x.id === element.id)
        // console.log("rt", data)
        if (!data) {
          this.Otherclist.push({ id: element.id, name: element.name, value: 0 });
        }
      });
    }
    this.dialogRef = this.modalPopupService.openPopup<OthercostComponent>(OthercostComponent, { data: this.Otherclist });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Othercostlist = [];
      let data = [];
      let sum: number = 0;
      this.dataservice.currentothercost_data.subscribe((res: any) => {
        // console.log("jjff", res)
        data = res;
        let packages = data.filter((a: any) => a.name == "Package");
        this.pack = packages[0].value;
        // console.log("jj", packages)
        if (packages[0].value == '' || packages[0].value == null) {
          packages[0].value = 0;
        }

        if (packages[0].value > 0) {
          this.Othercostlist = [];
          sum = parseInt(packages[0].value);
          this.ClaimForm.controls['OtherCE'].setValue(sum)
          let totalothercoste = packages[0].value;
          // console.log("packages", packages[0]);
          // this.Othercostlist.push({ id: packages[0].id, amount: parseInt(packages[0].value) });
          data.forEach((element: any) => {
            this.Othercostlist.push({ id: element.id, amount: parseInt(element.value) });
          })
          this.ClaimForm.controls["InitialCE"].setValue(totalothercoste)
          this.InitialCeCalculate();

        }

        else {
          data.forEach((element: any) => {
            this.Othercostlist.push({ id: element.id, amount: parseInt(element.value) });
            if (element.value == '' || element.value == null) {
              element.value = 0;
            }
            sum = sum + parseInt(element.value)
            // console.log("trt", res)
          });
          this.ClaimForm.controls['OtherCE'].setValue(sum)
          let totalroomcost = this.ClaimForm.get("totalRC")?.value;
          let totalothercoste = this.ClaimForm.get("OtherCE")?.value;
          if (packages[0].value > 0) {
            let total = Number(totalroomcost + totalothercoste)
            this.ClaimForm.controls["InitialCE"].setValue(total)
          }
          else {
            let total = Number(totalroomcost + totalothercoste)
            this.ClaimForm.controls["InitialCE"].setValue(total)
          }

          this.InitialCeCalculate();
        }

      });
    });
  }


  changeDate() {
    this.dateSent = new Date(this.dateSent).getFullYear() + '-' + ('0' + new Date(this.dateSent).getMonth()).slice(-2) + '-' + ('0' + new Date(this.dateSent).getDate()).slice(-2);
    this.dateReceived = this.dateSent;

    this.minDate = this.ClaimForm.value.DateOfAdmission
    this.ClaimForm.controls["DateOfDischarge"].setValue('');


  }

  OngrouppolicykCheck(event: any) {

    if (event.target.checked == true) {
      this.IsGroups = true;
      this.InsuaranceForm.controls["Groupcompany"].setValidators([Validators.required]);
      this.InsuaranceForm.controls["employeeId"].setValidators([Validators.required]);
      this.InsuaranceForm.controls["Groupcompany"].updateValueAndValidity();
      this.InsuaranceForm.controls["employeeId"].updateValueAndValidity();
    } else {
      this.IsGroups = false;
      this.InsuaranceForm.controls["Groupcompany"].reset();
      this.InsuaranceForm.controls["employeeId"].reset();


      this.InsuaranceForm.controls["Groupcompany"].clearValidators();
      this.InsuaranceForm.controls["Groupcompany"].updateValueAndValidity();
      this.InsuaranceForm.controls["employeeId"].clearValidators();
      this.InsuaranceForm.controls["employeeId"].updateValueAndValidity();
    }
    // console.log(event.target.checked)

  }

  OnPatientSubmit(formData: any) {

    this.submitted = true;
    if (this.claimInfoID == null) {
      this.OtherCosts.forEach((element: any) => {
        if (this.Otherclist.length != this.OtherCosts.length) {
          this.Otherclist.push({ id: element.id, name: element.name, value: 0 });
        }
      });
    }
    if (this.ClaimForm.valid) {
      let otherCostDetail: any = [];
      this.Othercostlist.forEach((res: any) => {
        if (res.amount != 0) {
          otherCostDetail.push({ id: res.id, amount: res.amount });
        }
      })

      // if (this.IsHospitaluser = true) {
      //   this.HospitalMstID = sessionStorage.getItem("hospitalMstId");
      // }

      let hospitalMstId = sessionStorage.getItem("hospitalMstId");
      if (hospitalMstId != "null"){
        this.HospitalMstID = sessionStorage.getItem("hospitalMstId");
      }




      //Call to savePatientInfo service
      this.claimService.savePatientInfo(this.claimStageId, this.claimInfoID, this.claimStageLinkId, this.patientInfoId, this.ClaimForm, otherCostDetail, this.HospitalMstID)
        .subscribe({
          next: (res) => {
            // console.log("patientSave response", res);
            if (res != null) {


              if (res.responseStatus == "SUCCESS") {
                this.patientInfoResponse = res;
                this.claimInfoID = this.patientInfoResponse.claimInfoId;
                this.patientInfoId = this.patientInfoResponse.patientInfoId;
                this.claimStageLinkId = this.patientInfoResponse.claimStageLinkId;
                this.healspanClaimNo = this.patientInfoResponse.healspanClaimNo
                this.OnInsuarancecontinue(this.InsuaranceForm);
                // document.getElementById('btnpatientcontinue')?.click;
              }
              else {
                this.dataservice.openSnackBar({ 'data': environment.PatientError })
              }
            }
            else {
              this.dataservice.openSnackBar({ 'data': environment.PatientError })
            }
          },
          error: (err: HttpErrorResponse) => {
            this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
            // console.log("HttpErrorResponse" + err.status);
            // alert("Something Went Wrong!")
          }
        })

    }
  }

  onMedformSubmit(formData: any) {
    // console.log("dfhbd", formData)
    this.submitted2 = true;

    if (this.medicalForm.valid) {
      if (this.claimInfoID != null) {
        this.claimInfoID = this.patientInfoResponse.claimInfoId;
      }

      this.claimService.saveMedicalInfo(this.claimStageId, this.claimStageLinkId, this.medicalInfoId, this.medicalForm, this.medicalAndChronicIllnessLink)
        .subscribe({
          next: (res) => {
            // console.log("saveMedicalInfo response", res);
            if (res != null) {

              if (res.responseStatus == "SUCCESS") {
                this.medicalInfoResponse = res;
                this.medicalInfoId = this.medicalInfoResponse.medicalInfoId;
                this.GetSequentialquestion();
                this.IsSaveSequentialQue = true;
                this.IfmedicalForm = true;
                // document.getElementById('btnmedcontinue')?.click;
              }
              else {
                this.dataservice.openSnackBar({ 'data': environment.MedicalError })
              }
            }
            else {
              this.dataservice.openSnackBar({ 'data': environment.MedicalError })
            }
          },
          error: (err: HttpErrorResponse) => {
            this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
            // console.log("HttpErrorResponse" + err.status);
            // alert("Something Went Wrong!")
          }
        })
    }

  }

  SaveSequentialQue() {

    let questionlist: any = [];

    this.questioncostheader.forEach((element: any) => {
      questionlist.push({ "question": element.label, "answer": element.value })
    });

    //remove alredy existing documents
    if (this.displaydoclist != null) {
      if (this.displaydoclist.length > 0) {
        this.displaydoclist.forEach((element: any) => {
          this.doclist.forEach((item: any, index: any) => {
            if (item === element.documentsMstId) this.doclist.splice(index, 1);
          });
        })
      }
    }

    this.claimService.saveSequentialQue(this.claimStageLinkId, questionlist, this.doclist)
      .subscribe({
        next: (ruleres) => {
          // console.log("saveSequentialQue response", ruleres);
          if (ruleres.responseStatus == "SUCCESS") {
            this.ruleInfoResponse = ruleres;
            this.displaydoclist = ruleres.documentList;
          }
        },
        error: (err: HttpErrorResponse) => {
          // console.log("HttpErrorResponse" + err.status);
          alert("Something Went Wrong!")
        }
      })
  }


  GetSequentialquestion() {

    let res = this.DiagnosisDetail.filter((a: any) => a.id == this.medicalForm.value.Provisionaldiagnosis)
    this.diagnosis = res[0]?.ruleEngineName;

    let res1 = this.procedureDetail.filter((a: any) => a.id == this.medicalForm.value.Procedures)
    this.procedure = res1[0]?.ruleEngineName;

    let mandatorydoc: any = [];
    if (this.ActiveStage == "Initial Authorization") {
      mandatorydoc = this.initialDoc
    } else if (this.ActiveStage == "Enhancement") {
      mandatorydoc = this.enhanceDoc
    } else if (this.ActiveStage == "Discharge") {
      mandatorydoc = this.dischargeDoc
    } else if (this.ActiveStage == "Final Claim") {
      mandatorydoc = this.finalDoc
    }

    // if (this.displaydoclist != null && this.displaydoclist.length == 0) {
    //   mandatorydoc.forEach((element: any) => {
    //     this.doclist.push(element.id);
    //   });
    // }

    if (this.displaydoclist == null || this.displaydoclist.length == 0) {
      mandatorydoc.forEach((element: any) => {
        this.doclist.push(element.id);
      });
    }

    if (this.diagnosis == 'Others') {
      //  let param ={
      //   "claimStage": this.ActiveStage
      //  }
      this.otherDiagnosis(this.ActiveStage);

    }
    else {
      let bodyparam = {
        "diagnosis": this.diagnosis,
        "claimStage": this.ActiveStage,
        "treatmentType": this.treatmentType,
        "gender": this.gender,
        "age": this.ClaimForm.get("Age")?.value,
        "procedure": this.procedure,
        "duration": this.medicalForm.get("Duration")?.value,
        "claimValue": this.medicalForm.get("Claim")?.value
      }
      this.GenerateRuleEngineModel(bodyparam)
    }



  }

  GenerateRuleEngineModel(bodyparam: any) {
    this.api.postService(environment.ruleBaseUrl, bodyparam).subscribe(res => {
      if (res) {
        // console.log(res);
        let data: any = [];
        data.push(res);

        // deafult rule execute
        // if (data[0].operation == null) {
        //   let bodyparam = {
        //     "diagnosis": this.diagnosis,
        //     "claimStage": this.ActiveStage,
        //   }
        //   this.GenerateRuleEngineModel(bodyparam)
        // }
        // end deafult rule execute

        if (data[0].operation == "Question") {
          //console.log(this.countObectKeys(apiresponse));
          var object: any = {};
          if (data[0].question != null) {
            //----loop for answer---------------------
            //------Declare and split options ,push value to array---------------
            let options: any = [];
            var substring = data[0].options.split("|");
            //console.log(substring)

            substring.forEach((element: any) => {
              let optionsres = { "label": element, "value": element }
              options.push(optionsres);
            });
            object["rlabel"] = data[0].question;
            object["roptions"] = options;
            object["value"] = "",
              object["type"] = "select",

              this.Questions = [];
            this.Questions.push(object);
          }
          this.BuildRuleForm();

        }
        else {
          if (data[0].document != null && data[0].document != "") {

            var docsubstring = data[0].document.split("|");
            docsubstring.forEach((element: any) => {
              //let optionsres = {element}
              //--- add logic for fetch id from name usng new api given by satya

              this.addNewDoc(element);


            });
          }
        }

        this.SaveSequentialQue();
      }
    })
  }

  // CheckDocExistorNot() {
  //   this.claimService.retrieveclaim(this.claimStageLinkId)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.displaydoclist = res.documentList;
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
  //       }
  //     })
  // }

  addNewDoc(newdocname: any) {

    let url = 'healspan/claim/getdocument/'
    //+ newdocname + '/2';
    let param = {
      "documentname": newdocname,
      "typeid": 2
    }

    this.api.post(url, param).subscribe((res: any) => {
      if (res) {
        this.doclist.push(res.id);
      }
    })
  }

  OnInsuarancecontinue(formData: any) {
    // console.log("dwefw", formData)
    this.submitted3 = true;

    if (this.InsuaranceForm.valid) {
      if (this.claimInfoID != null) {
        this.claimInfoID = this.patientInfoResponse.claimInfoId;
      }
      this.claimService.saveInsuranceInfo(this.claimStageId, this.claimStageLinkId, this.insuranceInfoId, this.InsuaranceForm)
        .subscribe({
          next: (res) => {
            // console.log("saveInsuranceInfo response", res);
            if (res != null) {
              if (res.responseStatus == "SUCCESS") {

              }
              else {
                this.dataservice.openSnackBar({ 'data': environment.InsuaranceError })
              }
            }
            else {
              this.dataservice.openSnackBar({ 'data': environment.InsuaranceError })
            }
          },
          error: (err: HttpErrorResponse) => {
            this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
            // console.log("HttpErrorResponse" + err.status);
            // alert("Something Went Wrong!")
          }
        })


    }
  }

  FinalSubmit() {
    this.docbutton = true;
    this.doclistvalidation();
  }

  //-----Start File Upload Logic ------------------------
  fileChange(event: any, i: any, docid: any) {
    this.docbutton = false
    this.currentupload = docid;
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {

      const file = fileList[0];
      //get file information such as name, size and type
      // console.log('finfo', file.name, file.size, file.type);
      if (file.type == "image/gif" || file.type == "application/pdf" || file.type == "image/jpeg" || file.type == "image/png") {
        // ----EndCooment----------
        let body = new FormData();
        body.append('file', file),
          body.append('inputDocId', docid),
          body.append('claimStageLinkId', this.claimStageLinkId),
          body.append('claimInfoId', this.claimInfoID),

          this.http.post(environment.baseUrl + 'healspan/claim/upload', body).subscribe({
            next: (data: any) => {


              let input = document.getElementById('status_' + i) as HTMLInputElement | undefined;
              input!.innerText = file.name;

              this.displaydoclist.forEach((element: any, index: any) => {

                if (element.id == docid) {


                  // console.log(this.displaydoclist)
                  if (data) {
                    this.displaydoclist.splice(index, 1, data.documentList[0])
                  }
                }
              })

              // console.log(this.displaydoclist)
              // this.getDocList();





            },
            error: (err: HttpErrorResponse) => {
              this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
            }
          }
          );

      }
      else {
        alert("Please Upload Valid File")
      }

    }
  }

  //get all documnets based on  claimStageLinkId
  getDocList() {
    this.claimService.saveSequentialQue(this.claimStageLinkId, [], [])
      .subscribe({
        next: (ruleres) => {
          // console.log("saveSequentialQue response", ruleres);
          if (ruleres.responseStatus == "SUCCESS") {
            this.displaydoclist = ruleres.documentList;
          }
        },
        error: (err: HttpErrorResponse) => {
          // console.log("HttpErrorResponse" + err.status);
          alert("Something Went Wrong!")
        }
      })
  }

  OnDownload(docid: any) {
    window.location.href = environment.baseUrl + 'healspan/claim/download/' + docid;
  }


  //-----------------Bind all dropdown
  bindDropdown() {
    this.api.getService('healspan/claim/get-master-details/',this.LoggedInId).subscribe((data: any) => {
      this.TPADetail = data["tpa_mst"];



    })

  }

  //---------Start Binding Values on basis of tpa
  tpaselect(event: any) {
    this.InsuaranceForm.controls["RelationOPH"].setValue(null);
    this.ClaimForm.controls["Gender"].setValue('');
    this.medicalForm.controls["Provisionaldiagnosis"].setValue(null);
    this.medicalForm.controls["Procedures"].setValue(null);
    this.tpaDropdown(event.target.value);
  }

  tpaDropdown_withoutapicall(){
      this.dataservice.currentTpa_data.subscribe((data: any) => {
      this.procedureDetail = data["procedure_mst"];
      this.DiagnosisDetail = data["diagnosis_mst"];
      this.roomsDetail = data["room_category_mst"];
      this.GenderDetail = data["gender_mst"];
      this.RPADetail = data["relationship_mst"];

      this.insuaranceCompanyDetail = data["insurance_company_mst"];


      this.OtherCosts = data["other_costs_mst"];


      this.specialityDetail = data["speciality_mst"];
      this.chronicillnessDetail = data["chronic_illness_mst"];

      this.claimStageMaster = data["claim_stage_mst"];
      this.treatmentTypeDetails = data["treatment_type_mst"];

      this.initialDoc = data["initial_stage"];
      this.enhanceDoc = data["enhancement_stage"];
      this.dischargeDoc = data["discharge_stage"];
      this.finalDoc = data["final_stage"];
      this.manadtorydoc = data["mandatory_documents_mst"]

      if (this.claimStageId == null) {
        let stage = this.claimStageMaster.filter((x: any) => x.name == this.ActiveStage);
        this.claimStageId = stage[0].id;
      }

    })
  }


  tpaDropdown(id: any) {
    
    this.api.getService('healspan/claim/get-tpawise-master-details/',id).subscribe((data: any) => {
      this.procedureDetail = data["procedure_mst"];
      this.DiagnosisDetail = data["diagnosis_mst"];
      this.roomsDetail = data["room_category_mst"];
      this.GenderDetail = data["gender_mst"];
      this.RPADetail = data["relationship_mst"];

      this.insuaranceCompanyDetail = data["insurance_company_mst"];
      this.OtherCosts = data["other_costs_mst"];
      this.specialityDetail = data["speciality_mst"];
      //this.hospitalDetail = data["hospital_mst"];
      this.chronicillnessDetail = data["chronic_illness_mst"];

      this.claimStageMaster = data["claim_stage_mst"];
      this.treatmentTypeDetails = data["treatment_type_mst"];

      this.initialDoc = data["initial_stage"];
      this.enhanceDoc = data["enhancement_stage"];
      this.dischargeDoc = data["discharge_stage"];
      this.finalDoc = data["final_stage"];
      this.manadtorydoc = data["mandatory_documents_mst"]

      if (this.claimStageId == null) {
        let stage = this.claimStageMaster.filter((x: any) => x.name == this.ActiveStage);
        this.claimStageId = stage[0].id;
      }

    })

  }



  OnGenderSelect(event: any) {
    this.gender = event.target.options[event.target.options.selectedIndex].text;
    this.medicalForm.controls['Genders'].setValue(event.target.value)
  }
  // -------------End Binding Values on selection to Next medical Form

  ageCalculator() {
    if (this.ClaimForm.value.DOB) {
      const convertAge = new Date(this.ClaimForm.value.DOB);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    let age = this.ClaimForm.get("Age")?.value;
    this.medicalForm.controls['Ages'].setValue(this.showAge)
  }

  calculateDiff() {
    let DateOfAdmission = new Date(this.ClaimForm.get("DateOfAdmission")?.value);
    let DateOfDischarge = new Date(this.ClaimForm.get("DateOfDischarge")?.value);
    let costperday = this.ClaimForm.get("CostPD")?.value;

    let days = Math.ceil((DateOfDischarge.getTime() - DateOfAdmission.getTime()) / 1000 / 60 / 60 / 24);

    let totalcost: number = days * costperday;
    this.ClaimForm.controls["totalRC"].setValue(totalcost);    //alert(days);

    let totalroomcost = this.ClaimForm.get("totalRC")?.value;
    let totalothercoste = this.ClaimForm.get("OtherCE")?.value;
    if (this.pack > 0) {
      let total = this.pack
      this.ClaimForm.controls["InitialCE"].setValue(total)
    }
    else {
      let total = Number(totalroomcost + totalothercoste)
      this.ClaimForm.controls["InitialCE"].setValue(total)
    }
    this.InitialCeCalculate();

    let hours = Math.abs(DateOfDischarge.getTime() - DateOfAdmission.getTime()) / 3600000;
    this.medicalForm.controls["Duration"].setValue(hours);

  }

  // Binding Values on selection to Next Form----end

  // --------------------------------------------------------------------------------------------------


  chronicillnessSelect(event: any) {

    this.medicalAndChronicIllnessLink = []
    for (let i = 0; i < event.value.length; i++) {
      const dvar = this.chronicillnessDetail.filter((x: any) => x.name == event.value[i]);

      this.medicalAndChronicIllnessLink.push({
        "id": dvar[0].id,
      });

      this.medicalAndChronicIllnessLink.forEach((item: any, index: any) => {
        if (item === dvar[0].id) this.medicalAndChronicIllnessLink.splice(index, 1);
      });

    }
  }

  Ondiagnosis(event: any) {
    let res = this.DiagnosisDetail.filter((a: any) => a.id == event)
    this.diagnosis = res[0]?.ruleEngineName;
  }

  onprocedureSelect(event: any) {
    this.medicalForm.controls['Procedures'].setValue(event)

    let res = this.procedureDetail.filter((a: any) => a.id == event)
    this.procedure = res[0]?.ruleEngineName;
  }

  OntreatmentType(event: any) {
    this.treatmentType = event.target.options[event.target.options.selectedIndex].text;
  }

  OnGender(event: any) {
    this.gender = event.target.options[event.target.options.selectedIndex].text;
  }

  //ng multiselect Dropdown Start

  onItemSelect(item: any) {
    // console.log(item);
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

  onItemDeSelect(item: any) {
    // console.log(item);
  }


  BuildRuleForm() {
    this.questioncostheader.push({
      label: this.Questions[0].rlabel,
      value: "",
      type: "select",
      options: this.Questions[0].roptions,
    });
    // console.log("questioncostheader", this.questioncostheader);
  }

  OnQuestionSelect(event: any, question: any) {

    let item = this.questioncostheader.find((x: any) => x.label == question);
    Object.assign(item, { 'value': event.target.value })

    if (this.answerparam == "") {
      this.answerparam = event.target.value;
    } else {
      this.answerparam = this.answerparam + '|' + event.target.value;
    }

    let bodyparam = {
      "diagnosis": this.diagnosis,
      "claimStage": this.ActiveStage,
      "treatmentType": this.treatmentType,
      "gender": this.gender,
      "age": this.ClaimForm.get("Age")?.value,
      "procedure": this.procedure,
      "duration": this.medicalForm.get("Duration")?.value,
      "claimValue": this.medicalForm.get("Claim")?.value,
      "answer": this.answerparam
    }

    this.GenerateRuleEngineModel(bodyparam)
  }

  getreceiveothercost(event: any) {
    //alert(event.target.value)
  }


  calculateDiffHours() {
    let DateOfAdmission = new Date(this.ClaimForm.get("DateOfAdmission")?.value);
    let DateOfDischarge = new Date(this.ClaimForm.get("DateOfDischarge")?.value);
    let hours = Math.abs(DateOfDischarge.getTime() - DateOfAdmission.getTime()) / 3600000;
    this.medicalForm.controls["Duration"].setValue(hours);
  }


  InitialCeCalculate() {
    let InitialCES = 0;
    if (this.ActiveStage == "Initial Authorization") {
      InitialCES = this.ClaimForm.get("InitialCE")?.value;
    } else if (this.ActiveStage == "Enhancement") {
      InitialCES = this.ClaimForm.get("Enhancementestimate")?.value;
    } else if (this.ActiveStage == "Discharge") {
      InitialCES = this.ClaimForm.get("ClaimedAmount")?.value;
    } else if (this.ActiveStage == "Final Claim") {
      InitialCES = this.ClaimForm.get("ClaimedAmount")?.value;
    }
    this.medicalForm.controls["Claim"].setValue(InitialCES);
  }

  doclistvalidation() {
    if (this.claimInfoID != null) {
      this.claimInfoID = this.patientInfoResponse.claimInfoId;
      this.api.getService("healspan/claim/retrieveclaim/",this.claimStageLinkId).subscribe({
        next: (data: any) => {
          // console.log("hello", data.documentList)
          let docdata: any = [];
          docdata = data.documentList;
          if (docdata?.length > 0) {
            docdata.forEach((element: any) => {
              if (element.status == false) {
                this.docbutton = false;

              }
            })
          } else {
            this.docbutton = true;
          }

          //Final Submit
          if (this.docbutton == true) {
            let param = {
              "claimId": this.claimInfoID,
              "stageId": this.claimStageId,
              "flowType": "HOSPITAL_USER_SUBMITTED_CLAIM",
              "transferComment": null
            }


            this.claimService.UpdateClaimStage(param)
              .subscribe({
                next: (res: any) => {
                  if (res != null) {
                    this.ClaimID = res.claimId

                    // console.log("UpdateClaimStage response", res);
                    document.getElementById("btnsubmit")?.click();
                    setTimeout(() => {
                      this.commonservice.redirecttoactivedashboard();
                    },
                      5000);

                    if (res.responseStatus == "FAILED") {
                      this.dataservice.openSnackBar({ 'data': environment.SubmitSave })
                    }
                  }
                },
                error: (err: HttpErrorResponse) => {
                  this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
                }
              })
          } 
          else {
            alert("Please Upload All documents")
          }
        },
      }
      )
    }

  }

  numericOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  }

  validateNumber(event: any) {
    const keyCode = event.keyCode;

    const excludedKeys = [9, 8, 37, 39, 46];
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }



  DocbckBtnClick() {
    this.IfmedicalForm = false;
  }

  onDropdownChange(event: any) {
    this.disabledItem = event.target.value;
    // console.log(event.target.value)
  }


  showdocPopup() {

    let addpopdoc = this.manadtorydoc.filter((a: any) => a.documentTypeId == 1);

    this.dialogRef = this.dialog.open(AddFilePopUpComponentComponent, {
      height: "400px",
      width: "500px",
      data: addpopdoc

    });
    this.dialogRef.afterClosed().subscribe(result => {
      // console.log("addpopdata", result);
      if (result.length > 0) {
        this.claimService.saveSequentialQue(this.claimStageLinkId, [], result)
          .subscribe({
            next: (ruleres: any) => {
              // console.log("saveSequentialQue response", ruleres);
              if (ruleres.responseStatus == "SUCCESS") {
                this.displaydoclist = ruleres.documentList;
              }
            },
            error: (err: HttpErrorResponse) => {
              this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
            }
          })
      }

    })

  }

  disableField(event: any) {
    this.checkboxValue = event.target.checked;
    if (!this.checkboxValue) {
      this.medicalAndChronicIllnessLink = []; this.selectedObjectsFromArray = [];
      this.medicalForm.controls["Pasthistoryofchronicillness"].setValue([]);
      document.getElementById("matselect")?.click();
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  DeleteDoc(docid: any) {
    const message = `Do you want to delete this document?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmLogoutComponent, {

      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {

        // let params=  {
        //       "docId": docid,
        //       "isCardPresent": "true"
        //   }
        this.claimService.DeleteDocument(docid)
          .subscribe({
            next: (data) => {
              this.displaydoclist = [];


              // this.CheckDocExistorNot();
              this.getDocList()

            },
          })
      }


    })


  }

  relationselect(event: any) {

    // this.ClaimForm.controls["Fname"].setValue("");
    // this.ClaimForm.controls["Mname"].setValue("");
    // this.ClaimForm.controls["Lname"].setValue("");
    let output;
    let id = this.InsuaranceForm.value.RelationOPH;
    let realtionname = this.RPADetail.filter((a: any) => a.id == id);
    //alert(realtionname[0].name);
    if (realtionname[0]?.name == "Self") {
      let fullname = this.InsuaranceForm.value.PolicyHolder
      var names = fullname.split(' ');

      if (names.length > 2) {
        output = [{
          firstname: names[0],
          middlenames: names.slice(1, -1).join(' '),
          lastname: names[names.length - 1]
        }];
      } else if (names.length < 2) {
        output = [{
          firstname: names[0],
          middlenames: '',
          lastname: ''
        }];
      } else {
        output = [{
          firstname: names[0],
          middlenames: '',
          lastname: names[names.length - 1]
        }];
      }
      // console.log('output' + JSON.stringify(output));
      this.ClaimForm.controls["Fname"].setValue(output[0].firstname);
      this.ClaimForm.controls["Mname"].setValue(output[0].middlenames);
      this.ClaimForm.controls["Lname"].setValue(output[0].lastname);
    }

  }

  load(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }



  otherDiagnosis(otherParam: any) {
    this.claimService.getOtherDocuments(otherParam)
      .subscribe({
        next: (data: any) => {
          // console.log("response" + data);
          // let resdata:any=[];
          if (data) {
            var docsubstring = data.documentList.split(",");
            docsubstring.forEach((element: any) => {
              this.doclist.push(parseInt(element));
            });

            //remove alredy existing documents
            // if(this.displaydoclist != null){
            //   if (this.displaydoclist.length > 0) {
            //     this.displaydoclist.forEach((element: any) => {
            //         resdata.forEach((item: any, index: any) => {
            //         if (item != element.documentsMstId) {
            //           this.doclist.push(item);
            //         }
            //       });
            //     })
            //   }
            // }

            // this.doclist.push(data.documentList);
            this.doclist = this.removeDuplicates(this.doclist);
            this.SaveSequentialQue();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.dataservice.openSnackBar({ 'data': environment.ErrorMessage })
        }
      })
  }

  removeDuplicates(arr: any) {
    return arr.filter((item: any,
      index: any) => arr.indexOf(item) === index);
  }
}


