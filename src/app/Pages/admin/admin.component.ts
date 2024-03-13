import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/service/table.service';
import { HttpClient } from '@angular/common/http';
export interface tablename {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'table-show';
  tablelists: tablename[] = [
    {value: 'tpa_mst', viewValue: 'tpa_mst'},
    {value: 'other_costs_mst', viewValue: 'other_costs_mst'},
    {value: 'diagnosis_mst', viewValue: 'diagnosis_mst'},
    {value: 'treatment_type_mst', viewValue: 'treatment_type_mst'},    
    {value: 'discharge_stage', viewValue: 'discharge_stage'},
    {value: 'status_mst', viewValue: 'status_mst'},
    {value: 'insurance_company_mst', viewValue: 'insurance_company_mst'},
    {value: 'initial_stage', viewValue: 'initial_stage'},
    {value: 'procedure_mst', viewValue: 'procedure_mst'},
    {value: 'room_category_mst', viewValue: 'room_category_mst'},
    {value: 'enhancement_stage', viewValue: 'enhancement_stage'},
    {value: 'mandatory_documents_mst', viewValue: 'mandatory_documents_mst'},
    {value: 'final_stage', viewValue: 'final_stage'},
    {value: 'chronic_illness_mst', viewValue: 'chronic_illness_mst'},
    {value: 'user_mst', viewValue: 'user_mst'},
    {value: 'gender_mst', viewValue: 'gender_mst'},
    {value: 'claim_stage_mst', viewValue: 'claim_stage_mst'},
    {value: 'speciality_mst', viewValue: 'speciality_mst'},
    {value: 'relationship_mst', viewValue: 'relationship_mst'},
    {value: 'user_role_mst', viewValue: 'user_role_mst'},
    {value: 'hospital_mst', viewValue: 'hospital_mst'}
  ];
  exportTypes= [
    {
        "id": 1,
        "name": "Single Private AC",
        "Edit":"assets/img/icons/delete.svg"
        
    },
    {
        "id": 2,
        "name": "Delux Room"
    },
    {
        "id": 3,
        "name": "Twin Sharing"
    },
    {
        "id": 4,
        "name": "Triple Sharing"
    },
    {
        "id": 5,
        "name": "General Ward"
    },
    {
        "id": 6,
        "name": "Super Delux"
    },
    {
        "id": 7,
        "name": "Suite"
    },
    {
        "id": 8,
        "name": "Non/Ac room"
    },
    {
        "id": 9,
        "name": "ICU/NICU/SICU"
    },
    {
        "id": 10,
        "name": "Daycare"
    },
    {
        "id": 11,
        "name": "OPD"
    }
]
  constructor(private obj:TableService,private http:HttpClient) { }
  valuelist:any;
  columnNames:string[] | undefined;
  
  ngOnInit(): void {
    
  //  let url=this.http.get('http://13.235.113.71:8109/healspan/claim/admin/masters/name/other_costs_mst').subscribe(x=>{
  //   this.model1=x;
  //   let abc=x;
  
  //    ;
  // })
  }
  model1:any=[];
     tablelist(){
      this.obj.getTabledata().subscribe(x=>{
        this.model1=x;
       
      })
     }
     onclick(value: number){
      this.valuelist=value;
  
      
    }
    exportfile(){
      let url=this.http.get('http://3.109.1.145:8109/healspan/claim/admin/masters/name/'+this.valuelist).subscribe(x=>{
    this.model1=x;   
    debugger; 
    this.exportTypes=this.model1[this.valuelist];
 
    this.columnNames = Object.keys(this.model1[this.valuelist][0]);
   
    })
    }

    
 
}
