import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Chucvu } from '../model/Chucvu.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:38312/api";
  Role:Chucvu= new Chucvu('','','',0);


  getList():Observable<Chucvu[]>
  {
    return this.http.get<Chucvu[]>(`${this.urlAPI}/ManageRole/get-role`);
  }

  remove(id:any)
  {
    return this.http.delete(`${this.urlAPI}/ManageRole/${id}`)
  }

  update(id:any, Role:Chucvu)
  {
    return this.http.put(`${this.urlAPI}/ManageRole/${id}`,Role);
  }
  add(Role:Chucvu)
  {
    return this.http.post(`${this.urlAPI}/ManageRole`,Role);
  }
}
