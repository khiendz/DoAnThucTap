import { Component, NgModule, Input, Output, EventEmitter, OnInit, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { DxSelectBoxModule } from 'devextreme-angular';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';

const deMessages = require('devextreme/localization/messages/de.json');
const ruMessages = require('devextreme/localization/messages/ru.json');
const localization = require('devextreme/localization');
import { Locale, Payment, HeaderService } from './header.service';
import { Localization } from '../../services/localization.service';

import notify from 'devextreme/ui/notify';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

const locales: Locale[] = [{
  Name: 'English',
  Value: 'en',
}, {
  Name: 'Deutsch',
  Value: 'de',
}, {
  Name: 'Русский',
  Value: 'ru',
}, {
  Name: 'Việt Nam',
  Value: 'vn',
}];

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  locale: string = '';

  locales: Locale[] = [];

  user: IUser | null = { email: '' };

  payments: Payment[] = [];

  formatMessage = formatMessage;


  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService: AuthService, private router: Router, public service:Localization)
  {
    this.locale = this.getLocale();
    this.payments = service.getPayments();
    this.locales = service.getLocales();

    this.initMessages();
    locale(this.locale);
  }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  initMessages() {
    loadMessages(deMessages);
    loadMessages(ruMessages);
    loadMessages(this.service.getDictionary());
  }

  changeLocale(data:any) {
    this.setLocale(data.value);
    parent.document.location.reload();
  }

  getLocale() {
    const locale = sessionStorage.getItem('locale');
    return locale != null ? locale : 'en';
  }

  setLocale(locale:any) {
    sessionStorage.setItem('locale', locale);
  }


}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    DxSelectBoxModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
