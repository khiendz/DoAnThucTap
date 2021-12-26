import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxSchedulerModule } from 'devextreme-angular';
import { Appointment, Service } from './clockify.service';

@Component({
  selector: 'app-clockify',
  templateUrl: './clockify.component.html',
  styleUrls: ['./clockify.component.scss']
})
export class ClockifyComponent implements OnInit {


  ngOnInit(): void {
  }

  appointmentsData: Appointment[];

  currentDate: Date = new Date(2021, 2, 28);

  constructor(service: Service) {
    this.appointmentsData = service.getAppointments();
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
