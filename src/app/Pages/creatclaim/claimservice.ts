import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/api.service';
const httpOptions= {
  headers: new HttpHeaders({
 'Content-Type':'application/json',
  //'Access-Control-Allow-Origin': '*',
  //'Authorization': `Bearer ${sessionStorage.getItem("jwttoken")}`
  //'Authorization': 'Bearer ' + sessionStorage.getItem("token")
 })
};
@Injectable({
  providedIn: 'root'
})



export class claimService {

  LoggedInId:any;
  constructor(private http: HttpClient,private api:ApiService) {
    this.LoggedInId = sessionStorage.getItem("LoggedInId");

   }

   retrieveclaim(claimStageLinkId:any){
    return this.http.get<any>(environment.baseUrl+"healspan/claim/retrieveclaim/"+claimStageLinkId)
   }

  savePatientInfo(claimStageId:any,claimInfoID:any,claimStageLinkId:any,patientInfoId:any,ClaimForm:any,otherCostDetail:any,hospitalMstId:any)
  {
    let patientbody = {
        "id": claimInfoID,
        "claimStageLinkId": claimStageLinkId,
        "userId" : this.LoggedInId != null ? parseInt(this.LoggedInId) : null,
        "hospitalId" : hospitalMstId != null ? parseInt(hospitalMstId) : null,
        "claimStageId" : claimStageId != null ? parseInt(claimStageId) : null,
        "statusId" : 1,
        "requestType" :claimInfoID==null?"CREATE":"EDIT",
        "patientInfoDto" : {
            "id": patientInfoId != null ? parseInt(patientInfoId) : null,
            "claimStageLinkId": claimStageLinkId,
            "firstName" : ClaimForm.value.Fname,
            "middleName" : ClaimForm.value.Mname,
            "lastname" : ClaimForm.value.Lname,
            "mobileNo" : ClaimForm.value.MobileNo,
            "dateBirth" : ClaimForm.value.DOB,
            "age" : ClaimForm.value.Age != null ? parseInt(ClaimForm.value.Age) : null ,
            "isPrimaryInsured": ClaimForm.value.patientprimaryInsured,
            "dateOfAdmission" : ClaimForm.value.DateOfAdmission,
            "estimatedDateOfDischarge" : ClaimForm.value.DateOfDischarge,
            "dateOfDischarge" : ClaimForm.value.DateOfDischarge,
            "costPerDay" : ClaimForm.value.CostPD,
            "totalRoomCost" : ClaimForm.value.totalRC,
            "otherCostsEstimate" : ClaimForm.value.OtherCE,
            "initialCostEstimate" : ClaimForm.value.InitialCE,
            "billNumber" : ClaimForm.value.BillNumber,
            "claimedAmount" : ClaimForm.value.ClaimedAmount,
            "enhancementEstimate" : ClaimForm.value.Enhancementestimate,
            "finalBillAmount" : ClaimForm.value.FinalbillAmount,
            "patientUhid" : ClaimForm.value.PHUHID,
            "hospitalId" : hospitalMstId != null ? parseInt(hospitalMstId) : null,
            "roomCategoryId" : ClaimForm.value.RoomCategory != null ? parseInt(ClaimForm.value.RoomCategory) : null,
            "genderId" : ClaimForm.value.Gender != null ? parseInt(ClaimForm.value.Gender) : null,
            "patientAndOtherCostLink" : otherCostDetail,
            
        }
    }
    
    return this.http.post<any>(environment.baseUrl+"healspan/claim/createorupdateclaimandpatientinfo",patientbody,httpOptions)

  }


  saveMedicalInfo(claimStageId:any,claimStageLinkId:any,medicalInfoId:any,medicalForm:any,medicalAndChronicIllnessLink:any){

    let medicalParam = {
        "id": medicalInfoId != null ? parseInt(medicalInfoId) : null,
        "claimStageLinkId": claimStageLinkId != null ? parseInt(claimStageLinkId) : null,
        "dateOfFirstDiagnosis" : medicalForm.value.Dateoffirstdiagnosis,
        "claimStageId" : claimStageId != null ? parseInt(claimStageId) : null,
        "doctorName" : medicalForm.value.Nameofthetreatingdoctor,
        "doctorQualification" :medicalForm.value.Qualificationofthetreatingdoctor,
        "doctorRegistrationNumber": medicalForm.value.DrResgistrationnumber,
        "medicalAndChronicIllnessLink" : medicalAndChronicIllnessLink,
        "diagnosisId" : medicalForm.value.Provisionaldiagnosis != null ? parseInt(medicalForm.value.Provisionaldiagnosis) : null,
        "procedureId" : medicalForm.value.Procedures != null ? parseInt(medicalForm.value.Procedures) : null,
        "specialityId" : medicalForm.value.Speciality != null ? parseInt(medicalForm.value.Speciality) : null,
        "treatmentTypeId" : medicalForm.value.TreatmentType != null ? parseInt(medicalForm.value.TreatmentType) : null,
        "comments":medicalForm.value.Comment
      }

      return this.http.post<any>(environment.baseUrl+"healspan/claim/createorupdatemedicalinfo",medicalParam,httpOptions)


  }


  saveInsuranceInfo(claimStageId:any,claimStageLinkId:any,insuranceInfoId:any,InsuaranceForm:any){

    let insuranceParam = {
        "id": insuranceInfoId != null ? parseInt(insuranceInfoId) : null,
        "claimStageLinkId": claimStageLinkId != null ? parseInt(claimStageLinkId) : null,
        "claimStageId" : claimStageId != null ? parseInt(claimStageId) : null,
        "tpaIdCardNumber" : InsuaranceForm.value.TPAnumber,
        "policyHolderName" : InsuaranceForm.value.PolicyHolder,
        "policyNumber" : InsuaranceForm.value.PolicyNumber,
        "isGroupPolicy" : InsuaranceForm.value.IsGroupPolicy != "" ? InsuaranceForm.value.IsGroupPolicy : false,
        "groupCompany" : InsuaranceForm.value.Groupcompany != null ? InsuaranceForm.value.Groupcompany : null,
        "claimIDPreAuthNumber" : null,
        "initialApprovalAmount" : null,
        "approvedEnhancementsAmount" : null,
        "approvedAmountAtDischarge" : null,
        "tpaId" : InsuaranceForm.value.TPAID != null ? parseInt(InsuaranceForm.value.TPAID) : null,
        "insuranceCompanyId" : InsuaranceForm.value.InsuranceCompany != null ? parseInt(InsuaranceForm.value.InsuranceCompany) : null,
        "relationshipId" :  InsuaranceForm.value.RelationOPH != null ? parseInt(InsuaranceForm.value.RelationOPH) : null,
        "groupCompanyEmpId":  InsuaranceForm.value.employeeId != null ? InsuaranceForm.value.employeeId : null,
        "tpaClaimNumber" : InsuaranceForm.value.TPAClaimID,
    }
    return this.http.post<any>(environment.baseUrl+"healspan/claim/createorupdateinsuranceinfo",insuranceParam,httpOptions)
  }


  saveSequentialQue(claimStageLinkId:any,questionlist:any,doclist:any){

    let ruleEngineParam = {
        "claimStageLinkId": claimStageLinkId != null ? parseInt(claimStageLinkId) : null,
        "sequentialQuestion": questionlist,
        "documentIdList": doclist
      }
    return this.http.post<any>(environment.baseUrl+"healspan/claim/savequestionnairesanddocument",ruleEngineParam,httpOptions)


  }


  UpdateClaimStage(Param:any){
    return this.http.post<string>(environment.baseUrl+"healspan/claim/updateclaimstatus",Param);   
  }


  Query(Param:any){
    return this.http.post<string>(environment.baseUrl+"healspan/claim/comment",Param);
  }

  TpaAction(Param:any){
    return this.http.post<string>(environment.baseUrl+"tpa/claim/tparesponse",Param);
  }

  Notification(params:any){
    return this.http.post<string>(environment.baseUrl+"healspan/claim/updateusernotification",params);
  }


  DeleteDocument(id:any){
   return this.http.delete<any>(environment.baseUrl+"healspan/claim/delete-documents/"+ id);
  }

  getOtherDocuments(otherParam:any){
    return this.http.get<any>(environment.baseUrl+"healspan/claim/otherdiagnosisdocument/"+otherParam);
  }
  
}
 
