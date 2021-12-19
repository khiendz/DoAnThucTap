import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { first, map } from 'rxjs/operators';
import { User } from 'src/app/model/Account';
import { AuthService } from '../../services';
import { AuthenticationService } from '../../services/authentication.service';
import { ManageUser } from '../../services/manageUser.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};
  loginForm: any;
  error: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authentication: AuthenticationService,
    public manageUser: ManageUser
  ) {}

  async onSubmit(e: Event) {
    debugger;


    e.preventDefault();
    const { username, password } = this.formData;
    this.loading = true;

    this.loading = true;
    var check;
    try
    {
    this.authentication.login(username, password).subscribe(
      (res :User) => {
        debugger
        if(res != null)
        {
          this.authService.logIn(username, password);
          check = true;
        }
      },
      (error: RequestCache) => {
        console.log(error);
        this.error = error;
        this.loading = false;
        notify("Authentication failed")
      }
    );}catch(error)
    {
      console.log(error);
      this.error = error;
      this.loading = false;
      notify("Authentication failed")
    }

    debugger
    this.manageUser.getUserByUserName(username).subscribe(
      res => {
        localStorage.setItem('accountUser', JSON.stringify(res));
        console.log(res);
      }
    );
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  };
}
@NgModule({
  imports: [CommonModule, RouterModule, DxFormModule, DxLoadIndicatorModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
