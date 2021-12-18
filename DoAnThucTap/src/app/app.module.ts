import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeManagerComponent } from './pages/employee-manager/employee-manager.component';
import { DxiColumnModule, DxiItemModule, DxoEditingModule, DxoFormModule, DxoLookupComponent, DxoLookupModule, DxoPopupModule, DxoSearchPanelModule } from 'devextreme-angular/ui/nested';
import { DxButtonModule, DxDataGridModule, DxFileUploaderModule, DxValidatorModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { RoleManagerComponent } from './pages//role-manager/role-manager.component';
import { DepartmentManagerComponent } from './pages/department-manager/department-manager.component';
import { ContractComponent } from './pages/contract/contract.component';
import dxFileUploader from 'devextreme/ui/file_uploader';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentManagerComponent,
    ContractComponent
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
    DxFileUploaderModule
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
