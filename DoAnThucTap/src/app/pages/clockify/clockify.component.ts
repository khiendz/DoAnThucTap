import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxSchedulerComponent, DxSchedulerModule } from 'devextreme-angular';
import { ChamCong } from 'src/app/shared/model/ChamCong.model';
import { Luong } from 'src/app/shared/model/Luong.model';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';
import { ClockifyService } from 'src/app/shared/services/clockify.service';
import { SalartService } from 'src/app/shared/services/manageSalary.service';
import { ManageUser } from 'src/app/shared/services/manageUser.service';
import { Service } from '../timekeeping/timekeeping.service';
import { Appointment, ClockService } from './clockify.service';

const user = localStorage.getItem('accountUser')
? JSON.parse(localStorage.getItem('accountUser') || '')
: [];
@Component({
  selector: 'app-clockify',
  templateUrl: './clockify.component.html',
  styleUrls: ['./clockify.component.scss']
})
export class ClockifyComponent implements OnInit {


  // @ViewChild(DxSchedulerComponent, { static: false })
  scheduler!: DxSchedulerComponent;
  appointmentsData: Appointment[];
  maNhanVien: string = '';
  currentDate: Date = new Date(2021, 2, 28);
  _luong: Luong = new Luong('',0,'',0);
  _chamCong: ChamCong = new ChamCong('',new Date(),'',new Date(),new Date(),'','',new Luong('',0,'',0), new Nhanvien('','',new Date(),0,'','','','',''));
  listLuong: ChamCong[] = [];

  constructor(service: Service, public salartService: SalartService,public manageUser: ManageUser, public clockify: ClockifyService) {
    this.appointmentsData = service.getAppointments();
    // var apiData: Appointment = new Appointment();

    // this.clockify.getList().subscribe(
    //   res =>
    //   {
    //     debugger
    //     this.listLuong = res;
    //     this.listLuong.forEach(element => {
    //       apiData.text = element.TenCongViec;
    //       apiData.startDate = new Date(element.GioBatDau);
    //       apiData.endDate = new Date(element.GioKetThuc);
    //       this.appointmentsData.push(apiData);
    //     });
    //   }
    // )
  }

  ngOnInit(): void {
    // const user = localStorage.getItem('accountUser')
    // ? JSON.parse(localStorage.getItem('accountUser') || '')
    // : [];
    // this.salartService.getLuongById(user.MaNhanVien).subscribe(
    //   res =>
    //   {
    //     this._luong = res;
    //   }
    // );
  }

  add(e:any)
  {
    debugger
    let chamCong: ChamCong = this._chamCong;
    chamCong.MaChamCong = '';
    chamCong.NgayChamCong = new Date(Date.now());
    chamCong.GioBatDau = e.appointmentData.startDate;
    chamCong.GioKetThuc = e.appointmentData.endDate;
    chamCong.MaNhanVien = user.MaNhanVien;
    chamCong.MaLuong = this._luong.MaLuong;
    chamCong.TenCongViec = e.appointmentData.text;
    chamCong.maLuongNavigation = this._luong;
    chamCong.MaNhanVienNavigation = user;
    this.clockify.add(chamCong).subscribe(
      res =>
      {
      }
    );
    }
}
@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,
  ],
  declarations: [ClockifyComponent],
  bootstrap: [ClockifyComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
