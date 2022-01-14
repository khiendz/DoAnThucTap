import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxSchedulerComponent,
  DxSchedulerModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ChamCong } from 'src/app/shared/model/ChamCong.model';
import { Luong } from 'src/app/shared/model/Luong.model';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';
import { ClockifyService } from 'src/app/shared/services/clockify.service';
import { SalartService } from 'src/app/shared/services/manageSalary.service';
import { ManageUser } from 'src/app/shared/services/manageUser.service';
import { CommondService } from 'src/app/shared/services/url-api.service';
import { Service } from '../timekeeping/timekeeping.service';
import { Appointment, ClockService } from './clockify.service';

const user = localStorage.getItem('accountUser')
  ? JSON.parse(localStorage.getItem('accountUser') || '')
  : [];
@Component({
  selector: 'app-clockify',
  templateUrl: './clockify.component.html',
  styleUrls: ['./clockify.component.scss'],
})
export class ClockifyComponent implements OnInit {
  // @ViewChild(DxSchedulerComponent, { static: false })
  scheduler!: DxSchedulerComponent;
  appointmentsData: Appointment[];
  maNhanVien: string = '';
  currentDate: Date = new Date(Date.now());
  _luong: Luong = new Luong('', 0, '', 0);
  _nhanVien: Nhanvien[] = [];
  _nhanVienDisplay: Nhanvien[] = [];
  _chamCong: ChamCong = new ChamCong(
    '',
    new Date(),
    '',
    new Date(),
    new Date(),
    '',
    '',
    new Luong('', 0, '', 0),
    new Nhanvien('', '', new Date(), 0, '', '', '', '', '')
  );
  listLuong: ChamCong[] = [];
  role: boolean = false;

  constructor(
    service: ClockService,
    public salartService: SalartService,
    public manageUser: ManageUser,
    public clockify: ClockifyService,
    public employee: CommondService
  ) {
    this.appointmentsData = [];
    this.employee.getListEmployee().subscribe((res) => {
      this._nhanVien = res;
    });
    if(user.Role == 'Admin' || user.Role == 'Hr')
    {
      this.role = true;
    }else
    this.role = false;

    this.clockify.getList().subscribe((res) => {
      this.listLuong = res;
      if (this.role)
        this.listLuong.forEach((element) => {
          let apiData: Appointment;
          if (element.MaNhanVien == this._nhanVien[0].MaNhanVien) {
            apiData = {
              MaChamCong: element.MaChamCong,
              text: element.TenCongViec,
              startDate: new Date(element.GioBatDau),
              endDate: new Date(element.GioKetThuc),
            };
            this.appointmentsData.push(apiData);
          }
        });
      else
        this.listLuong.forEach((element) => {
          let apiData: Appointment;
          if (element.MaNhanVien == user.MaNhanVien) {
            apiData = {
              MaChamCong: element.MaChamCong,
              text: element.TenCongViec,
              startDate: new Date(element.GioBatDau),
              endDate: new Date(element.GioKetThuc),
            };
            this.appointmentsData.push(apiData);
          }
        });
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem('accountUser')
      ? JSON.parse(localStorage.getItem('accountUser') || '')
      : [];
    this.salartService.getLuongById(user.MaNhanVien).subscribe((res) => {
      this._luong = res;
    });
  }

  add(e: any) {
    if (this.check(e.appointmentData.startDate)) {
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
      this.clockify.add(chamCong).subscribe((res) => {});
    } else {
      e.cancel = true;
    }
  }

  _delete(e: any) {
    if (this.check(e.appointmentData.startDate)) {
      this.clockify.remove(e.appointmentData.MaChamCong).subscribe((res) => {});
    } else {
      e.cancel = true;
    }
    console.log(e);
  }

  update(e: any) {
    if (this.check(e.appointmentData.startDate)) {
      let chamCong: ChamCong = this._chamCong;
      chamCong.MaChamCong = e.appointmentData.id;
      chamCong.GioBatDau = e.appointmentData.startDate;
      chamCong.GioKetThuc = e.appointmentData.endDate;
      chamCong.TenCongViec = e.appointmentData.text;
      this.clockify
        .update(e.appointmentData.id, chamCong)
        .subscribe((res) => {});
    } else {
      e.cancel = true;
    }
  }

  check(date: Date) {
    if (+date < Date.now() - 86400000) {
      notify(
        'Cannot create or move an appointment/event to disabled time/date regions.',
        'warning',
        1000
      );
      return false;
    }
    return true;
  }

  changeUser(e: any) {
    console.log(e);
    this.appointmentsData = [];
    this.clockify.getList().subscribe((res) => {
      this.listLuong = res;
      this.listLuong.forEach((element) => {
        let apiData: Appointment;
        if (element.MaNhanVien == e.selectedItem.MaNhanVien) {
          apiData = {
            MaChamCong: element.MaChamCong,
            text: element.TenCongViec,
            startDate: new Date(element.GioBatDau),
            endDate: new Date(element.GioKetThuc),
          };
          this.appointmentsData.push(apiData);
        }
      });
    });
  }
}
@NgModule({
  imports: [BrowserModule, DxSchedulerModule, DxSelectBoxModule],
  declarations: [ClockifyComponent],
  bootstrap: [ClockifyComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
