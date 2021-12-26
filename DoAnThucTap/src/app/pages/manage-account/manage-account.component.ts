import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { Nhanvien } from 'src/app/shared/model/Nhanvien.model';
import { TaiKhoan } from 'src/app/shared/model/TaiKhoan.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ManageUser } from 'src/app/shared/services/manageUser.service';
import { CommondService } from 'src/app/shared/services/url-api.service';
import { ManageAccountService, Employee, State } from './manageAccount.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  dataSource: Employee[];
  listUser: TaiKhoan[] = [];
  listEmployee: Nhanvien[] = [];
  // states: State[];

  events: Array<string> = [];

  constructor(service: ManageAccountService,public manageUser: ManageUser,public accountService: AuthenticationService, public manageEmployee: CommondService) {
    this.dataSource = service.getEmployees();
    // this.states = service.getStates();
    manageUser.getListUser().subscribe(
      res =>
      {
        this.listUser = res;
      }
    );

    manageEmployee.getListEmployee().subscribe(
      res =>
      {
        this.listEmployee = res;
      }
    );
  }

  logEvent(eventName: any) {
    // this.events.unshift(eventName);
  }

  public clearEvents() {
    this.events = [];
  }

  public ngOnInit(): void {
  }

  public createAccount(e:any)
  {
    let account: TaiKhoan = new TaiKhoan('','','','','');
    account.Id = e.data.Id;
    account.UserName = e.data.UserName;
    account.Password = e.data.Password;
    account.Role = e.data.Role;
    account.MaNhanVien = e.data.MaNhanVien;

    debugger
    this.manageUser.add(account).subscribe(res =>
      {
        console.log(res);
      });
    this.manageUser.getUserByUserName(account.UserName).subscribe(
      res =>
      {
        this.manageUser.add2(res).subscribe(ress =>
            {
              console.log(ress);
            });
      }
    );
    // this.accountService.register(e.data.UserName,e.data.Password).subscribe(res =>
    //   {
    //     console.log(res);
    //   });

      // this.manageUser.add2(account).subscribe(res =>
      //   {
      //     console.log(res);
      //   });
  }

  public deleteAccount(e:any)
  {
    let account: TaiKhoan = new TaiKhoan('','','','','');
    account.UserName = e.data.UserName;
    account.Password = e.data.Password;
    account.MaNhanVien = e.data.MaNhanVien;
    account.Role = e.data.Role;
    account.Id = e.data.Id;
    this.manageUser.removed(e.data.MaNhanVien).subscribe(res =>
      {
        console.log(res);
      });
      this.manageUser.removed2(account).subscribe(res =>
        {
          console.log(res);
        });

  }

  public updateAccount(e:any)
  {
    let account: TaiKhoan = new TaiKhoan('','','','','');
    account.UserName = e.data.UserName;
    account.Password = e.data.Password;
    account.MaNhanVien = e.data.MaNhanVien;
    account.Role = e.data.Role;
    account.Id = e.data.Id;

    this.manageUser.update(account.Id,account).subscribe(res =>
      {
        console.log(res);
      });

      this.manageUser.update2(account).subscribe(res =>
        {
          console.log(res);
        });
  }

}
