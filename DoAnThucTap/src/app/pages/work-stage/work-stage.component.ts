import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';
import { QuaTrinhLamViec } from 'src/app/shared/model/QuaTrinhLamViec.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { StageService } from 'src/app/shared/services/stage.service';
import { CommondService } from 'src/app/shared/services/url-api.service';

@Component({
  selector: 'app-work-stage',
  templateUrl: './work-stage.component.html',
  styleUrls: ['./work-stage.component.scss']
})
export class WorkStageComponent implements OnInit {
  listWorkStage:QuaTrinhLamViec[]=[];
  listEmployee:any;
  stage:QuaTrinhLamViec= new QuaTrinhLamViec('', '', new Date(), new Date(), '', '', '');
  employee:Nhanvien= new Nhanvien('','',new Date(),1,'','','','','');
  listDepartment:any;
  listRole:any;
 
  @ViewChild('gridTemplate')
  gridTemplateComp!: DxDataGridComponent;
  constructor(public service:CommondService, public serviceDepartment:DepartmentService, public serviceRole:RoleService, public stageService:StageService) {
    this.cellTemplateAutoIncrement = this.cellTemplateAutoIncrement.bind(this);
  }

  ngOnInit(): void {
    this.refreshList();
    this.getDepartment();
    this.getRole();
    this.getEmployee();
  }
  update(event:any)
  {
    debugger;
    console.log(event);
    this.stageService.update(event.data.MaQuaTrinhLamViec, new QuaTrinhLamViec(event.data.MaQuaTrinhLamViec, event.data.MaNhanVien, event.data.ThoiGianBatDau, event.data.ThoiGianKetThuc, event.data.MaChucVu, event.data.MaPhongBan, event.data.MoTaCongViec)).subscribe(data=>
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
    this.stageService.removed(event.data.MaQuaTrinhLamViec).subscribe(data=>
      {
        this.refreshList();
      })
  }
  add(event:any)
  {
    debugger;
    console.log(event);
    this.stage=  new QuaTrinhLamViec(event.data.MaQuaTrinhLamViec, event.data.MaNhanVien, event.data.ThoiGianBatDau, event.data.ThoiGianKetThuc, event.data.MaChucVu, event.data.MaPhongBan, event.data.MoTaCongViec);
    this.stageService.add(this.stage).subscribe(data=>
      {
        this.refreshList();
      })
  }

  refreshList()
  {
    this.stageService.getListStage().subscribe(data=>{

      this.listWorkStage= data;
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
  getEmployee()
  {
    this.service.getListEmployee().subscribe(data=>
      {
        this.listEmployee = data;
      })

  }
}


