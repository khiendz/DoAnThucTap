import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Nhanvien } from '../model/Nhanvien.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommondService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:44344/api";
  Employee:Nhanvien= new Nhanvien('','',new Date(),1,'','','','','');


  getListEmployee():Observable<Nhanvien[]>
  {
    return this.http.get<Nhanvien[]>(`/manageemployee/get-employee`);
  }

  removed(id:any)
  {
    return this.http.delete(`/ManageEmployee/${id}`)
  }

  update(id:any, Employee:Nhanvien)
  {
    return this.http.put(`/ManageEmployee/${id}`,Employee);
  }
  add(Employee:Nhanvien)
  {
    debugger;
    return this.http.post(`/ManageEmployee`,Employee);
  }
}
