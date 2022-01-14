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
import { ChamCong } from 'src/app/shared/model/ChamCong.model';
import { Expression } from '@angular/compiler';

const user = localStorage.getItem('accountUser')
  ? JSON.parse(localStorage.getItem('accountUser') || '')
  : [];
const luongCoBan: number = 4200000;
@Component({
  selector: 'app-lichsuluong',
  templateUrl: './lichsuluong.component.html',
  styleUrls: ['./lichsuluong.component.scss'],
})
export class LichsuluongComponent implements OnInit {
  // @ViewChild(DxSchedulerComponent, { static: false })
  maNhanVien: string = '';
  currentDate: Date = new Date(Date.now());
  _luong: Luong = new Luong('', 0, '', 0);
  dataSource: LichSuLuong[] = [];
  listEmployee: Nhanvien[] = [];
  listChamCong: ChamCong[] = [];
  listState: CheckState[] = [
    new CheckState(true, 'Đã thanh toán'),
    new CheckState(false, 'Chưa thanh toán'),
  ];
  listLuong: Luong[] = [];
  constructor(
    public service: CommondService,
    public salartService: SalartService,
    public managerLSL: ManagerLSL,
    public locallization: Localization,
    public clockify: ClockifyService
  ) {
    managerLSL.getList().subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem('accountUser')
      ? JSON.parse(localStorage.getItem('accountUser') || '')
      : [];

    this.service.getListEmployee().subscribe((data) => {
      this.listEmployee = data;
    });
    this.salartService.getList().subscribe(
      res =>
      {
        this.listLuong = res;
      }
    )
    //  this.salartService.getLuongById(user.MaNhanVien).subscribe(
    //    res => {
    //      this._luong = res;
    //    }
    //  );
  }

  onExporting(e: any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'HistoryPayment.xlsx'
        );
      });
    });
    e.cancel = true;
  }

  add(e: any) {

    debugger
    let luong: Number = luongCoBan*this.searchHeSoLuong(e.data.maNV) - (luongCoBan*this.searchHeSoLuong(e.data.maNV)*this.searchThue(e.data.maNV));
    let sum: Number = luong + e.data.luongBonus;
    e.data.luong = luong;
    e.data.sum = sum;
    this.managerLSL.add(e.data).subscribe((res) => {
      console.log(res);
    });
  }

  update(e: any) {
    let sum: Number = e.data.luong + e.data.luongBonus;
    e.data.sum = sum;
    this.managerLSL.update(e.data.maLSL, e.data).subscribe((res) => {
      console.log(res);
    });
    this.refesh();
  }

  remove(e: any) {
    this.managerLSL.remove(e.data.maLSL).subscribe((res) => {
      console.log(res);
    });
    this.refesh();
  }

  refesh()
  {
    this.managerLSL.getList().subscribe((res) => {
      this.dataSource = res;
    });
  }

  searchHeSoLuong(maNV:string): any
  {
    let heSoLuong :Number = 1;
    let maChucVu :string = '';
    try
    {
      for(let i=0;this.listEmployee.length-1;i++)
    {
      if(maNV == this.listEmployee[i].MaNhanVien)
      {
        maChucVu = this.listEmployee[i].MaChucVu;
        break;
      }
    }

    for(let i=0;this.listLuong.length-1;i++)
    {
      if(maChucVu == this.listLuong[i].MaChucVu)
      {
        heSoLuong = this.listLuong[i].Luong1;
        return heSoLuong;
      }
    }
    }
    catch(e:any)
    {
      return heSoLuong;
    }


  }
  searchThue(maNV:string): any
  {
    let thue :Number = 0.1;
    let maChucVu :string = '';
    try{for(let i=0;this.listEmployee.length-1;i++)
      {
        if(maNV == this.listEmployee[i].MaNhanVien)
        {
          maChucVu = this.listEmployee[i].MaChucVu;
          break;
        }
      }

      for(let i=0;this.listLuong.length-1;i++)
      {
        if(maChucVu == this.listLuong[i].MaChucVu)
        {
          thue = this.listLuong[i].Thue;
          return thue;
        }
      }}
      catch(e:any)
      {
        return thue;
      }

  }
}
