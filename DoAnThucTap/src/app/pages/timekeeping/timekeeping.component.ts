import { NgModule, Component, enableProdMode, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxButtonComponent, DxButtonModule, DxSchedulerComponent, DxSchedulerModule } from 'devextreme-angular';
import { Appointment,Service } from '../timekeeping/timekeeping.service';
import { SalartService } from '../../shared/services/manageSalary.service';
import { ChamCong } from 'src/app/shared/model/ChamCong.model';
import { ManageUser } from 'src/app/shared/services/manageUser.service';
import { ClockifyService } from 'src/app/shared/services/clockify.service';
import { Luong } from 'src/app/shared/model/Luong.model';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
const user = localStorage.getItem('accountUser')
? JSON.parse(localStorage.getItem('accountUser') || '')
: [];
@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.scss']
})
export class TimekeepingComponent implements OnInit {

  @ViewChild(DxSchedulerComponent, { static: false })
  scheduler!: DxSchedulerComponent;
  appointmentsData: Appointment[];
  maNhanVien: string = '';
  currentDate: Date = new Date();
  _luong: Luong = new Luong('',0,'',0);
  _chamCong: ChamCong = new ChamCong('',new Date(),'',new Date(),new Date(),'','',new Luong('',0,'',0), new Nhanvien('','',new Date(),0,'','','','',''));
  listLuong: ChamCong[] = [];

  constructor(service: Service, public salartService: SalartService,public manageUser: ManageUser, public clockify: ClockifyService) {
    this.appointmentsData = service.getAppointments();
    var apiData: Appointment = new Appointment();

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
    const user = localStorage.getItem('accountUser')
    ? JSON.parse(localStorage.getItem('accountUser') || '')
    : [];
    this.salartService.getLuongById(user.MaNhanVien).subscribe(
      res =>
      {
        this._luong = res;
      }
    );
  }

  add(e:any)
  {
    debugger
    let chamCong: ChamCong = this._chamCong;
    chamCong.MaChamCong = '';
    chamCong.NgayChamCong = new Date();
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
    DxButtonModule
  ],
  declarations: [TimekeepingComponent],
  bootstrap: [AppModule],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
