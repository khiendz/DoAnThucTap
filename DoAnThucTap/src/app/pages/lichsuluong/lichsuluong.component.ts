import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { ClockifyService } from '../../shared/services/clockify.service';
import { SalartService } from 'src/app/shared/services/manageSalary.service';
import { Luong } from 'src/app/shared/model/Luong.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { Chucvu } from 'src/app/shared/model/Chucvu.model';
import { saveAs } from 'file-saver-es';
// Our demo infrastructure requires us to use 'file-saver-es'. We recommend that you use the official 'file-saver' package in your applications.
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import { LichSuLuong } from 'src/app/shared/model/LichSuLuong.model';
import { ManagerLSL } from '../../shared/services/managerLSL.service';
import { CommondService } from 'src/app/shared/services/url-api.service';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';
import { CheckState } from 'src/app/shared/model/CheckState.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Localization } from 'src/app/shared/services/localization.service';

const user = localStorage.getItem('accountUser')
  ? JSON.parse(localStorage.getItem('accountUser') || '')
  : [];
@Component({
  selector: 'app-lichsuluong',
  templateUrl: './lichsuluong.component.html',
  styleUrls: ['./lichsuluong.component.scss']
})
export class LichsuluongComponent implements OnInit {

   // @ViewChild(DxSchedulerComponent, { static: false })
   maNhanVien: string = '';
   currentDate: Date = new Date(Date.now());
   _luong: Luong = new Luong('', 0, '', 0);
   dataSource:LichSuLuong[] = [];
   listEmployee:Nhanvien[]=[];
   listState:CheckState[] = [new CheckState(true,"Đã thanh toán"),new CheckState(false,"Chưa thanh toán")];
   constructor(public service:CommondService, public salartService: SalartService, public managerLSL:ManagerLSL,public locallization: Localization) {
     managerLSL.getList().subscribe(res =>
      {
        this.dataSource = res;
        console.log(res);
      });
   }

   ngOnInit(): void {
     const user = localStorage.getItem('accountUser')
       ? JSON.parse(localStorage.getItem('accountUser') || '')
       : [];

       this.service.getListEmployee().subscribe(data=>{

        this.listEmployee= data;
      })
    //  this.salartService.getLuongById(user.MaNhanVien).subscribe(
    //    res => {
    //      this._luong = res;
    //    }
    //  );
   }

   onExporting(e:any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'HistoryPayment.xlsx');
      });
    });
    e.cancel = true;
  }

  add(e:any)
  {
    this.managerLSL.add(e.data).subscribe(
      res =>
      {
        console.log(res);
      }
    );
  }

  update(e:any)
  {
    this.managerLSL.update(e.data.maLSL,e.data).subscribe(
      res =>
      {
        console.log(res);
      }
    );
  }

  remove(e:any)
  {
    this.managerLSL.remove(e.data.maLSL).subscribe(
      res =>
      {
        console.log(res);
      }
    );
  }

}
