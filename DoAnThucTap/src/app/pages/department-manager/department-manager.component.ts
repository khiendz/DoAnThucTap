import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { PhongBan } from 'src/app/shared/model/PhongBan.model';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-department-manager',
  templateUrl: './department-manager.component.html',
  styleUrls: ['./department-manager.component.scss']
})
export class DepartmentManagerComponent implements OnInit {
  listDepartment:PhongBan[]=[];
  department : any;
  @ViewChild('gridTemplate')
  gridTemplateComp!: DxDataGridComponent;
  constructor(public service:DepartmentService) {
    this.cellTemplateAutoIncrement = this.cellTemplateAutoIncrement.bind(this);
  }


  ngOnInit(): void {
    this.refreshList();
  }
  update(event:any)
  {
    console.log(event);
    this.service.update(event.data.MaPhongBan, new PhongBan(event.data.MaPhongBan, event.data.TenPhongBan, event.data.MoTa)).subscribe(data=>
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
    console.log(event.data.MaPhongBan);
    this.service.remove(event.data.MaPhongBan).subscribe(data=>
      {
        this.refreshList();
      })
  }
  add(event:any)
  {
    console.log(event);

    this.department= new PhongBan('', event.data.TenPhongBan, event.data.MoTa)
    this.service.add(this.department).subscribe(data=>
      {
        this.refreshList();
      })
  }

  refreshList()
  {
    this.service.getList().subscribe(data=>{

      this.listDepartment= data;
      console.log(this.listDepartment);
    })
  }
}


