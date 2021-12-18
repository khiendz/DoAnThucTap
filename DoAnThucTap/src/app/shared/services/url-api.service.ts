import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Nhanvien } from '../model/Nhanvien.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommondService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:38312/api";
  Employee:Nhanvien= new Nhanvien('','',new Date(),1,'','','','','');


  getListEmployee():Observable<Nhanvien[]>
  {
    return this.http.get<Nhanvien[]>(`${this.urlAPI}/manageemployee/get-employee`);
  }

  removed(id:any)
  {
    return this.http.delete(`${this.urlAPI}/ManageEmployee/${id}`)
  }

  update(id:any, Employee:Nhanvien)
  {
    return this.http.put(`${this.urlAPI}/ManageEmployee/${id}`,Employee);
  }
  add(Employee:Nhanvien)
  {
    debugger;
    return this.http.post(`${this.urlAPI}/ManageEmployee`,Employee);
  }
}
