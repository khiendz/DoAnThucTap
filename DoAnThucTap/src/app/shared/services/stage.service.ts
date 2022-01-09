import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Nhanvien } from '../model/Nhanvien.model';
import { Observable } from 'rxjs';
import { QuaTrinhLamViec } from '../model/QuaTrinhLamViec.model';
@Injectable({
  providedIn: 'root'
})
export class StageService {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:38312/api";
  Stage:QuaTrinhLamViec = new QuaTrinhLamViec('','', new Date(), new Date(),'', '', '');

  getListStage():Observable<QuaTrinhLamViec[]>
  {
    return this.http.get<QuaTrinhLamViec[]>(`/manageworkstage/get-stage`);
  }

  removed(id:any)
  {
    return this.http.delete(`/manageworkstage/${id}`)
  }

  update(id:any, Stage:QuaTrinhLamViec)
  {
    return this.http.put(`/manageworkstage/${id}`,Stage);
  }
  add(Stage:QuaTrinhLamViec)
  {
    debugger;
    return this.http.post(`/manageworkstage`,Stage);
  }
}
