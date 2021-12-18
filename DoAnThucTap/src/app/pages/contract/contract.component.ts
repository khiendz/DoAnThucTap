import { Component, OnInit, ViewChild } from '@angular/core';
import { Contract } from 'src/app/shared/model/DocumentManager.model';
import { ContractService } from 'src/app/shared/services/contract.service';
import notify from 'devextreme/ui/notify';
import { HttpClient } from '@angular/common/http';
import { confirm } from 'devextreme/ui/dialog';
import * as saveAs from 'file-saver';
import { DxDataGridComponent } from 'devextreme-angular';
import { CommondService } from 'src/app/shared/services/url-api.service';
import { HopDong } from 'src/app/shared/model/HopDong.model';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})

export class ContractComponent implements OnInit {
  listContract:HopDong[]=[];
  documentsSource: any[] = [];
  department : any;
  contract:HopDong= new HopDong('','','','');
  listEmployee:Nhanvien[]=[];
  @ViewChild('gridTemplate')
  gridTemplateComp!: DxDataGridComponent;
  constructor(public service:ContractService, private httpClient: HttpClient, public employService: CommondService) {
    this.cellTemplateAutoIncrement = this.cellTemplateAutoIncrement.bind(this);
  }

  ngOnInit(): void {
    this.refreshList();
    this.getEmployee();
  }

  upload()
  {
    this.service.upload();
    this.refreshList();
  }

  cellTemplateAutoIncrement(container: { textContent: any; }, options: { rowIndex: number; }) {
    container.textContent =
      this.gridTemplateComp.instance.pageIndex() * this.gridTemplateComp.instance.pageSize() + options.rowIndex + 1;
  }
  download(e: any) {
    const item = e.data;
    debugger;
    this.httpClient.post('http://localhost:38312/api/managercontract/download', item, { responseType: 'blob' }).subscribe((data: Blob) => {
      saveAs(data, item.Name);
    });
  }
  update(event:any)
  {
    console.log(event);
    this.service.update(event.data.MaHopDong, new HopDong('',event.data.TenHopDong,'',event.data.MaNhanVien)).subscribe(data=>
      {
        this.refreshList();
      })
  }
  delete(e: any) {
    const item = e.data;
    const doc = this.documentsSource.find((d) => d.Id === item.Id);
    const confirmText = 'Bạn có muốn xóa file này không';
    const result = confirm('<i>' + confirmText + '</i>','Xác nhận');
    result.then((dialogResult) => {
      if (dialogResult) {
        debugger;
        this.httpClient.post('http://localhost:38312/api/managercontract/delete', item).subscribe((response: any) => {
          this.refreshList();
        });
      }
    });
  }
  add(event:any)
  {
    debugger;
    console.log(event);
    this.contract= new HopDong('', event.data.TenHopDong,'',event.data.MaNhanVien);
    this.service.add(this.contract).subscribe(data=>
      {
        this.refreshList();
      })
  }
  removed(event:any)
  {
    console.log(event.data.Id);
    this.service.remove(event.data.Id).subscribe(data=>
      {
        this.refreshList();
      })
  }
  importDocuments(e:any) {
    debugger;
    const files = e.target.files;
    let isValid = true;
    const formData: any = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (this.listContract.some((x:any) => x.Name === file.name)) {
        notify('Duplicate document name', 'error');
        isValid = false;
      }
      if (file.type.indexOf('pdf') === -1) {
        notify('Please select pdf format', 'error');
        isValid = false;
      } else if (!this.validFileName(file.name, 'pdf')) {
        notify('Tên file chứa kí hiệu đặc biệt', 'error');
        isValid = false;
      }
      if (!isValid) {
        return;
      }
      formData.append('importFile' + i, file);
    }

    this.httpClient.post('http://localhost:38312/api/managercontract/upload', formData).subscribe(() => {
      this.refreshList();
    });
  }

  validFileName(fileName: string, extension: string) {
    const name = fileName.replace(extension, '');
    if (!name.trim()) {
      return false;
    }
    const regexSpecicalCharacter = /[`!@#$%^&*+\=\[\]{};':"\\|,<>\/?~]/;
    return !regexSpecicalCharacter.test(name);
  }

  refreshList()
  {
    this.service.getList().subscribe(data=>{
debugger;
      this.listContract= data;
      console.log(this.listContract);
    })
  }
  getEmployee()
  {
    this.employService.getListEmployee().subscribe(data=>
      {
        this.listEmployee = data;
      })

  }
}



