import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { ServiceTinhLuong, Employee, State } from './tinhluong.service';
import { ClockifyService } from '../../shared/services/clockify.service';
import { SalartService } from 'src/app/shared/services/manageSalary.service';
import { Luong } from 'src/app/shared/model/Luong.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { Chucvu } from 'src/app/shared/model/Chucvu.model';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@Component({
  selector: 'app-tinhluong',
  templateUrl: './tinhluong.component.html',
  styleUrls: ['./tinhluong.component.scss']
})
export class TinhluongComponent implements OnInit {

  dataSource: Luong[] = [];
  listLuong: Luong[] = [];
  luong: Luong = new Luong('',0,'',0);
  listChucVu: Chucvu[] = [];
  // states: State[];

  events: Array<string> = [];

  constructor(service: ServiceTinhLuong, serviceTinhLuong: SalartService, serviceChucVu: RoleService) {
    // this.states = service.getStates();
    serviceTinhLuong.getList().subscribe(
      res =>
      {
        this.listLuong = res;
        this.dataSource = res;
      }
    );

    serviceChucVu.getList().subscribe(
      res =>
      {
        this.listChucVu = res;
      }
    );

  }

  logEvent(eventName: any) {
    this.events.unshift(eventName);
  }

  clearEvents() {
    this.events = [];
  }

  ngOnInit(): void {
  }

  add(e: any) {

    console.log(e);
  }

  _delete(e: any) {
    console.log(e);
  }

  update(e: any)
  {
    console.log(e);
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  declarations: [TinhluongComponent],
  bootstrap: [TinhluongComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
