// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  baseUrl:'',
  ruleBaseUrl:'',
  hospitalUser:'2',
  healspanUser:'3',
  PendingDocuments :'Pending Documents',
  PendingTPAApproval :'Pending TPA Approval',
  PendingHSApproval  :'Pending HS Approval',
  TPAQuery:'TPA Query',
  Approved:'Approved',
  Rejected:'Rejected',

// Error Messages

HDashBoardError: "Could Not Get Hospital Data",
RDashBoardError:"Could Not Get Healspan Data",
PatientError: " Patient information not saved",
MedicalError:"Medical information not saved",
InsuaranceError:"Insuarance information not saved",
SubmitSave:"Something went wrong could not save data",
ErrorMessage:"Server side error"


};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
