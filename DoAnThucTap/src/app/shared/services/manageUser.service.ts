import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Nhanvien } from '../model/Nhanvien.model';
import { Observable } from 'rxjs';
import { TaiKhoan } from '../model/TaiKhoan.model';
@Injectable({
  providedIn: 'root'
})
export class ManageUser {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:44344/api";

  getListUser():Observable<TaiKhoan[]>
  {
    return this.http.get<TaiKhoan[]>(`/manageuser/get-department`);
  }

  getUserByUserName(id:string):Observable<any>
  {
    debugger
    let reques = (`/manageuser/get-detail-department/${id}`);
    return this.http.get<any>(reques);
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
