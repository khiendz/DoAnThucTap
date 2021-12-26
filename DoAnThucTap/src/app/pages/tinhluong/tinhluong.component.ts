import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { ServiceTinhLuong, Employee, State } from './tinhluong.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@Component({
  selector: 'app-tinhluong',
  templateUrl: './tinhluong.component.html',
  styleUrls: ['./tinhluong.component.scss']
})
export class TinhluongComponent implements OnInit {

  dataSource: Employee[];

  // states: State[];

  events: Array<string> = [];

  constructor(service: ServiceTinhLuong) {
    this.dataSource = service.getEmployees();
    // this.states = service.getStates();
  }

  logEvent(eventName: any) {
    this.events.unshift(eventName);
  }

  clearEvents() {
    this.events = [];
  }

  ngOnInit(): void {
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
