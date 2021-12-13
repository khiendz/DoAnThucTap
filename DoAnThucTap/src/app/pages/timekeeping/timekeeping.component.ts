import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxSchedulerModule } from 'devextreme-angular';
import { Appointment, Service } from '../timekeeping/timekeeping.service';

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

  currentDate: Date = new Date(2021, 2, 28);

  constructor(service: Service) {
    this.appointmentsData = service.getAppointments();
  }

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,
  ],
  declarations: [TimekeepingComponent],
  bootstrap: [AppModule],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
