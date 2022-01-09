import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import notify from 'devextreme/ui/notify';
import * as saveAs from 'file-saver';
import { confirm } from 'devextreme/ui/dialog';
import { ContractService } from 'src/app/shared/services/contract.service';
import { CommondService } from 'src/app/shared/services/url-api.service';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  listDocument:Document[]=[];
  documentsSource: any[] = [];
  department : any;
  @ViewChild('gridTemplate')
  gridTemplateComp!: DxDataGridComponent;
  constructor(public service:ContractService, private httpClient: HttpClient, public employService: CommondService) {
    this.cellTemplateAutoIncrement = this.cellTemplateAutoIncrement.bind(this);
  }

  ngOnInit(): void {
    this.refreshList();
  }

  upload(event:any)
  {
    debugger;
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
    this.httpClient.post('/managercontract/download', item, { responseType: 'blob' }).subscribe((data: Blob) => {
      saveAs(data, item.Name);

    });
  }

  delete(event: any) {
    const item = event.data;
    const doc = this.documentsSource.find((d) => d.Id === item.Id);
    const confirmText = 'Bạn có muốn xóa file này không';
    const result = confirm('<i>' + confirmText + '</i>', 'Xác nhận');
    result.then((dialogResult) => {
      if (dialogResult) {
        debugger;
        this.httpClient.post('/managercontract/delete', item).subscribe((response: any) => {
          this.refreshList();
        });
      }
      this.service.removeDetail(event.data.MaChiTietHopDong).subscribe(data=>
        {
          this.refreshList();
        })
    });

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
      if (this.listDocument.some((x:any) => x.Name === file.name)) {
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

    this.httpClient.post('/managercontract/upload', formData).subscribe(() => {
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
    this.service.getListDoc().subscribe(data=>{
      this.listDocument= data;
    })
  }
}



