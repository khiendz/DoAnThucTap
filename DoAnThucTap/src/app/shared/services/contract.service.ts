import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Contract } from '../model/DocumentManager.model';
import { Observable } from 'rxjs';
import { HopDong } from '../model/HopDong.model';
@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:38312/api";
  Role:HopDong= new HopDong('','','','');


  getList():Observable<HopDong[]>
  {
    return this.http.get<HopDong[]>(`${this.urlAPI}/ManagerContract/get`);
  }

  upload():string
  {
    return `this.${this.urlAPI}/ManagerContract/upload`;
  }
  add(contract:HopDong)
  {
    debugger;
    return this.http.post(`${this.urlAPI}/ManageContract`,contract);
  }
  download():string
  {
    return `this.${this.urlAPI}/ManagerContract/download`;
  }
  update(id:any, contract:HopDong)
  {
    return this.http.put(`${this.urlAPI}/ManageContract/${id}`,contract);
  }
  delete():string
  {
      return `this.${this.urlAPI}/ManagerContract/delete`;
  }
  remove(id:any)
  {
    return this.http.delete(`${this.urlAPI}/ManagerContract/${id}`)
  }

}
