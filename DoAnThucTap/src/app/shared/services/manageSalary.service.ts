import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Luong } from '../model/Luong.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalartService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:44344/api";
  // Role:Luong= new Luong('','', '','');


  getList():Observable<Luong[]>
  {
    return this.http.get<Luong[]>(`/ManageSalary/get-department`);
  }

  remove(id:any)
  {
    return this.http.delete(`ManageSalary/${id}`)
  }

  update(id:any, Department:Luong)
  {
    return this.http.put(`/ManageSalary/${id}`,Department);
  }
  add(Department:Luong)
  {
    return this.http.post(`/ManageSalary`,Department);
  }
}
