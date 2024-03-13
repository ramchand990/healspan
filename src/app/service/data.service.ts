import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../Pages/snackbar/snackbar.component';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private claimdetails_data = new BehaviorSubject([]);
  currentclaimdetails_data = this.claimdetails_data.asObservable();

  private user_data = new BehaviorSubject([]);
  currentuser_data = this.user_data.asObservable();

  private othercostdata = new BehaviorSubject([]);
  currentothercost_data = this.othercostdata.asObservable();

  private SlaClaimData = new BehaviorSubject([]);
  currentSla_data = this.SlaClaimData.asObservable();

  private TpaWiseData = new BehaviorSubject([]);
  currentTpa_data = this.TpaWiseData.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  updateclaimdetails_data(data: any) {

    this.claimdetails_data.next(data)
  }

  updatecurrentuser_data(data: any) {
    this.user_data.next(data)
  }

  updateothercostd_data(data: any) {
    this.othercostdata.next(data)
  }

  Sla_data(data: any) {
    this.SlaClaimData.next(data)
  }


  UpdateTpa_Data(data:any){
    this.TpaWiseData.next(data)
  }
  

  openSnackBar(msg: any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
      data: msg,
      panelClass: ['blue-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',

    }
    )
    // console.log(msg)
  }

}