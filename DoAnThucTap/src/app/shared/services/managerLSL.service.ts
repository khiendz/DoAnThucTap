import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { LichSuLuong } from '../model/LichSuLuong.model';
@Injectable({
  providedIn: 'root'
})
export class ManagerLSL {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:44344/api";

  getList():Observable<LichSuLuong[]>
  {
    return this.http.get<LichSuLuong[]>(`/LichSuLuongs/getAll`);
  }

  getLichSuLuongById(id:string):Observable<LichSuLuong>
  {
    return this.http.get<LichSuLuong>(`/LichSuLuongs/${id}`);
  }

  remove(id:any)
  {
    return this.http.delete(`/LichSuLuongs/delete/${id}`)
  }

  update(id:any, Department:LichSuLuong)
  {
    return this.http.put(`/LichSuLuongs/update/${id}`,Department);
  }
  add(Department:LichSuLuong)
  {
    return this.http.post(`/LichSuLuongs/create`,Department);
  }
}
