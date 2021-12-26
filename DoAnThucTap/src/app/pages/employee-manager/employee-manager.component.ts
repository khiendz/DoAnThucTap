import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { CommondService } from 'src/app/shared/services/url-api.service';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss']
})
export class EmployeeManagerComponent implements OnInit {
  listEmployee:Nhanvien[]=[];
  employee:Nhanvien= new Nhanvien('','',new Date(),1,'','','','','');
  listDepartment:any;
  listRole:any;
  phonePattern:any = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  sexDataSource = [{ caption: 'Nam', value: 1 },
                   { caption: 'Nữ', value: 0 }];

  @ViewChild('gridTemplate')
  gridTemplateComp!: DxDataGridComponent;
  constructor(public service:CommondService, public serviceDepartment:DepartmentService, public serviceRole:RoleService) {
    this.cellTemplateAutoIncrement = this.cellTemplateAutoIncrement.bind(this);
  }

  ngOnInit(): void {
    this.refreshList();
    this.getDepartment();
    this.getRole();
  }
  update(event:any)
  {
    this.service.update(event.data.MaNhanVien, new Nhanvien(event.data.MaNhanVien, event.data.TenNhanVien,event.data.NgaySinh,event.data.GioiTinh, event.data.SoDienThoai, event.data.DiaChi, event.data.Email, event.data.MaChucVu,event.data.MaPhongBan)).subscribe(data=>
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
    this.service.removed(event.data.MaNhanVien).subscribe(data=>
      {
        this.refreshList();
      })
  }
  add(event:any)
  {
    this.employee= new Nhanvien('', event.data.TenNhanVien,event.data.NgaySinh,event.data.GioiTinh, event.data.SoDienThoai, event.data.DiaChi, event.data.Email, event.data.MaChucVu,event.data.MaPhongBan)
    this.service.add(this.employee).subscribe(data=>
      {
        this.refreshList();
      })
  }

  refreshList()
  {
    this.service.getListEmployee().subscribe(data=>{

      this.listEmployee= data;
    })

  }
  getDepartment()
  {
    this.serviceDepartment.getList().subscribe(data=>
      {
        this.listDepartment = data;
      })

  }
  getRole()
  {
    this.serviceRole.getList().subscribe(data=>
      {
        this.listRole = data;
      })

  }
}


