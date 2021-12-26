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
    return this.http.get<QuaTrinhLamViec[]>(`${this.urlAPI}/manageworkstage/get-stage`);
  }

  removed(id:any)
  {
    return this.http.delete(`${this.urlAPI}/manageworkstage/${id}`)
  }

  update(id:any, Stage:QuaTrinhLamViec)
  {
    return this.http.put(`${this.urlAPI}/manageworkstage/${id}`,Stage);
  }
  add(Stage:QuaTrinhLamViec)
  {
    debugger;
    return this.http.post(`${this.urlAPI}/manageworkstage`,Stage);
  }
}
