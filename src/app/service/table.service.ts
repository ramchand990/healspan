import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TableService {
  readonly APIUrl="http://13.235.113.71:8109/healspan/"
  constructor(private obj:HttpClient) { }


  getTabledata():Observable<object>{
    return this.obj.get(this.APIUrl+'claim/admin/masters')
  }
}
