import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Chucvu } from 'src/app/shared/model/Chucvu.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { saveAs } from 'file-saver-es';
// Our demo infrastructure requires us to use 'file-saver-es'. We recommend that you use the official 'file-saver' package in your applications.
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.scss']
})
export class RoleManagerComponent implements OnInit {
  listRole:Chucvu[]=[];
  role : any;
  @ViewChild('gridTemplate')
  gridTemplateComp!: DxDataGridComponent;
  constructor( public service:RoleService) {
    this.cellTemplateAutoIncrement = this.cellTemplateAutoIncrement.bind(this);
  }


  ngOnInit(): void {
    this.refreshList();
  }
  update(event:any)
  {
    this.service.update(event.data.MaChucVu, new Chucvu(event.data.MaChucVu, event.data.TenChucVu,event.data.MoTa,event.data.HeSoLuong)).subscribe(data=>
      {
        this.refreshList();
      })
  }
  cellTemplateAutoIncrement(container: { textContent: any; }, options: { rowIndex: number; }) {
    container.textContent =
      this.gridTemplateComp.instance.pageIndex() * this.gridTemplateComp.instance.pageSize() + options.rowIndex + 1;
  }
  removed(event:any)
  {
    this.service.remove(event.data.MaChucVu).subscribe(data=>
      {
        this.refreshList();
      })
  }
  add(event:any)
  {
    this.role= new Chucvu('', event.data.TenChucVu,event.data.MoTa,event.data.HeSoLuong)
    this.service.add(this.role).subscribe(data=>
      {
        this.refreshList();
      })
  }

  refreshList()
  {
    this.service.getList().subscribe(data=>{

      this.listRole= data;
    })
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
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Employee.xlsx');
      });
    });
    e.cancel = true;
  }
}


