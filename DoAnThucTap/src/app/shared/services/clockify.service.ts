import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ChamCong } from '../model/ChamCong.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalartService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:44344/api";
  // Role:Luong= new Luong('','', '','');


  getList():Observable<ChamCong[]>
  {
    return this.http.get<ChamCong[]>(`/ManageClockify/get-department`);
  }

  remove(id:any)
  {
    return this.http.delete(`/ManageClockify/${id}`)
  }

  update(id:any, Department:ChamCong)
  {
    return this.http.put(`/ManageClockify/${id}`,Department);
  }
  add(Department:ChamCong)
  {
    return this.http.post(`/ManageClockify`,Department);
  }
}
