import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Chucvu } from '../model/Chucvu.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="https://localhost:44344/api";
  Role:Chucvu= new Chucvu('','','',0);


  getList():Observable<Chucvu[]>
  {
    return this.http.get<Chucvu[]>(`/ManageRole/get-role`);
  }

  remove(id:any)
  {
    return this.http.delete(`/ManageRole/${id}`)
  }

  update(id:any, Role:Chucvu)
  {
    return this.http.put(`/ManageRole/${id}`,Role);
  }
  add(Role:Chucvu)
  {
    return this.http.post(`/ManageRole`,Role);
  }
}
