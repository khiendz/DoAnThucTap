import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxButtonComponent, DxButtonModule, DxSchedulerModule } from 'devextreme-angular';
import { Appointment,Service } from '../timekeeping/timekeeping.service';
import { LuongService } from '../../shared/services/managerLuong.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.scss']
})
export class TimekeepingComponent implements OnInit {

  appointmentsData: Appointment[];

  currentDate: Date = new Date(2021, 3, 29);

  constructor(service: Service) {
    this.appointmentsData = service.getAppointments();
  }

  ngOnInit(): void {
  }

  // getLuong()
  // {
  //   this.luongService.getAllLuong().subscribe(
  //     (res: any) => {
  //       console.log(res);
  //     }
  //   );
  // }

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
