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
  readonly urlAPI ="http://localhost:44344/api";
  Role:HopDong= new HopDong('','','','');


  getList():Observable<HopDong[]>
  {
    return this.http.get<HopDong[]>(`/ManagerContract/get`);
  }

  upload():string
  {
    return `/ManagerContract/upload`;
  }
  add(contract:HopDong)
  {
    debugger;
    return this.http.post(`/ManageContract`,contract);
  }
  download():string
  {
    return `/ManagerContract/download`;
  }
  update(id:any, contract:HopDong)
  {
    return this.http.put(`/ManageContract/${id}`,contract);
  }
  delete():string
  {
      return `/ManagerContract/delete`;
  }
  remove(id:any)
  {
    return this.http.delete(`/ManagerContract/${id}`)
  }

}
