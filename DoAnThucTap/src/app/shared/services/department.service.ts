import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { PhongBan } from '../model/PhongBan.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:44344/api";
  Role:PhongBan= new PhongBan('','', '');


  getList():Observable<PhongBan[]>
  {
    return this.http.get<PhongBan[]>(`/ManageDepartment/get-department`);
  }

  remove(id:any)
  {
    return this.http.delete(`/ManageDepartment/${id}`)
  }

  update(id:any, Department:PhongBan)
  {
    return this.http.put(`/ManageDepartment/${id}`,Department);
  }
  add(Department:PhongBan)
  {
    return this.http.post(`/ManageDepartment`,Department);
  }
}
