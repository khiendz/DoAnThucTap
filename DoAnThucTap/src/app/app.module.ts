import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeManagerComponent } from './pages/employee-manager/employee-manager.component';
import { DxiColumnModule, DxiItemModule, DxoEditingModule, DxoFormModule, DxoLookupComponent, DxoLookupModule, DxoPopupModule, DxoSearchPanelModule } from 'devextreme-angular/ui/nested';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxFileUploaderModule, DxSelectBoxModule, DxValidatorModule } from 'devextreme-angular';
import { RoleManagerComponent } from './pages/role-manager/role-manager.component';
import { DepartmentManagerComponent } from './pages/department-manager/department-manager.component';
import { ContractComponent } from './pages/contract/contract.component';
import dxFileUploader from 'devextreme/ui/file_uploader';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { TimekeepingComponent } from './pages/timekeeping/timekeeping.component';
import { Appointment, Service } from 'src/app/pages/timekeeping/timekeeping.service';
import { TinhluongComponent } from './pages/tinhluong/tinhluong.component';
import { ServiceTinhLuong } from './pages/tinhluong/tinhluong.service';
import { ThongkeComponent } from './pages/thongke/thongke.component';
import { ThongKeService } from './pages/thongke/thongke.service';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { ManageAccountService } from './pages/manage-account/manageAccount.service';
import { WorkStageComponent } from './pages/work-stage/work-stage.component';
import { ClockifyComponent } from './pages/clockify/clockify.component';
import { ClockService } from './pages/clockify/clockify.service';
import { DocumentManagerComponent } from './pages/document-manager/document-manager.component';
import { ManagerLSL } from './shared/services/managerLSL.service';
import { LichsuluongComponent } from './pages/lichsuluong/lichsuluong.component';
import { HeaderService } from './shared/components/header/header.service';
import { Localization } from './shared/services/localization.service';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentManagerComponent,
    ContractComponent,
    ThongkeComponent,
    ManageAccountComponent,
    DocumentManagerComponent,
    WorkStageComponent,
    LichsuluongComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxiColumnModule,
    DxDataGridModule,
    DxoEditingModule,
    DxoPopupModule,
    DxoFormModule,
    DxiItemModule,
    DxoSearchPanelModule,
    DxoLookupModule,
    DxButtonModule,
    DxiColumnModule,
    DxValidatorModule,
    DxDataGridModule,
    DxFileUploaderModule,
    DxChartModule,
    DxSelectBoxModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, Service, ServiceTinhLuong, ThongKeService, ManageAccountService, ClockService, ManagerLSL, Localization,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    Title,],
  bootstrap: [AppComponent]
})
export class AppModule { }
