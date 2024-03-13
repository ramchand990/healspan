import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(private router: Router) { }

  redirecttoactivedashboard(){
    let activeDashboard =  sessionStorage.getItem("usertype");
    if(activeDashboard== '2'){
      
      // this.router.navigate(['hdashboard'])
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/hdashboard']));
  

    }
    else{
      // this.router.navigate(['rdashboard'])
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/rdashboard']));
    
    }
    
  }
}
