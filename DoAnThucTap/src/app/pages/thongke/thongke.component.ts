import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import {
  DxSelectBoxModule,
  DxTextBoxModule,
  DxTemplateModule,
} from 'devextreme-angular';

import { Population, Product, ThongKeService } from './thongke.service';
// import { Service, ComplaintsWithPercent } from './app.service';


@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss']
})
export class ThongkeComponent implements OnInit {

  simpleProducts: string[] = [];
  populationData: Population[];
  data: any;
  products: Product[] = [];

  constructor(public service: ThongKeService) {
    this.populationData = service.getPopulationData();
    this.simpleProducts = service.getSimpleProducts();
    this.data = new ArrayStore({
    data: this.products,
    key: 'ID',
  });
  }


  ngOnInit(): void {
  }

}
@NgModule({
  imports: [
    BrowserModule,
    DxChartModule,
  ],
  bootstrap: [ThongkeComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
