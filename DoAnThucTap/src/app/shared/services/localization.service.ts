import { Component, NgModule, Input, Output, EventEmitter, OnInit, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { DxSelectBoxModule } from 'devextreme-angular';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';

const deMessages = require('devextreme/localization/messages/de.json');
const ruMessages = require('devextreme/localization/messages/ru.json');
const localization = require('devextreme/localization');

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

import { Injectable } from '@angular/core';

export class Locale {
  Name: string = '';

  Value: string = '';
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

const payments: any[] = [{
  PaymentId: 1,
  ContactName: 'Nancy Davolio',
  CompanyName: 'Premier Buy',
  Amount: 1740,
  PaymentDate: '2013/01/06',
},
{
  PaymentId: 2,
  ContactName: 'Andrew Fuller',
  CompanyName: 'ElectrixMax',
  Amount: 850,
  PaymentDate: '2013/01/13',
},
{
  PaymentId: 3,
  ContactName: 'Janet Leverling',
  CompanyName: 'Video Emporium',
  Amount: 2235,
  PaymentDate: '2013/01/07',
},
{
  PaymentId: 4,
  ContactName: 'Margaret Peacock',
  CompanyName: 'Screen Shop',
  Amount: 1965,
  PaymentDate: '2013/01/03',
},
{
  PaymentId: 5,
  ContactName: 'Steven Buchanan',
  CompanyName: 'Braeburn',
  Amount: 880,
  PaymentDate: '2013/01/10',
},
{
  PaymentId: 6,
  ContactName: 'Michael Suyama',
  CompanyName: 'PriceCo',
  Amount: 5260,
  PaymentDate: '2013/01/17',
},
{
  PaymentId: 7,
  ContactName: 'Robert King',
  CompanyName: 'Ultimate Gadget',
  Amount: 2790,
  PaymentDate: '2013/01/21',
},
{
  PaymentId: 8,
  ContactName: 'Laura Callahan',
  CompanyName: 'EZ Stop',
  Amount: 3140,
  PaymentDate: '2013/01/01',
},
{
  PaymentId: 9,
  ContactName: 'Anne Dodsworth',
  CompanyName: 'Clicker',
  Amount: 6175,
  PaymentDate: '2013/01/24',
},
{
  PaymentId: 10,
  ContactName: 'Clark Morgan',
  CompanyName: 'Store of America',
  Amount: 4575,
  PaymentDate: '2013/01/11',
}];

export class PaymentView {
  Number: string = '';

  Contact: string = '';

  Company: string = '';

  Amount: string = '';

  PaymentDate: string = '';

  Name: string = '';
}

export class Dictionary {
  [key: string]: any;
}

const dictionary: Dictionary = {
  en: {
    Number: 'Number',
    Contact: 'Contact',
    Company: 'Company',
    Amount: 'Amount',
    PaymentDate: 'Payment Date',
    Name: 'Name',
    Salary: 'Salary',
    State: 'State',
    Description: 'Description',
    HistoryPayment: 'History Payment',
    DateOfBirth: 'Date of birth',
    Sex: 'Sex',
    PhoneNumber: 'Phone Number',
    Address: 'Address',
    Email: 'Email',
    Position: 'Position',
    Department: 'Department',
    Employee: 'Employee',
    SalaryBonus: 'Bonus Salary',
    Sum: "Sum",
  },
  de: {
    Number: 'Nummer',
    Contact: 'Ansprechpartner',
    Company: 'Firma',
    Amount: 'Betrag',
    PaymentDate: 'Zahlungsdatum',
    Name: 'Name',
    Salary: 'Salary',
    State: 'Zustand',
    Description: 'Beschreibung',
    HistoryPayment: 'Zahlungsverlauf',
    DateOfBirth: 'Geburtsdatum',
    Sex: 'Sex',
    PhoneNumber: 'Telefonnummer',
    Address: 'Adresse',
    Email: 'Email',
    Position: 'Position',
    Department: 'Abteilung',
    Employee: 'Mitarbeiter',
    SalaryBonus: 'Bonus Gehalt',
    Sum: "Summe",
  },
  ru: {
    Number: 'Номер',
    Contact: 'Имя',
    Company: 'Организация',
    Amount: 'Сумма',
    PaymentDate: 'Дата оплаты',
    Name: 'Имя',
    Salary: 'Оплата труда',
    State: 'Состояние',
    Description: 'Описание',
    HistoryPayment: 'История платежей',
    DateOfBirth: 'Дата рождения',
    Sex: 'Секс',
    PhoneNumber: 'телефонный номер',
    Address: 'Адрес',
    Email: 'электронное письмо',
    Position: 'Должность',
    Department: 'отделение',
    Employee: 'Наемный рабочий',
    SalaryBonus: 'премиальная заработная плата',
    Sum: "Сумма",
  },
  vn: {
    Number: 'Số',
    Contact: 'Liên hệ',
    Company: 'Công ty',
    Amount: 'Số lượng',
    PaymentDate: 'Ngày trả lương',
    Name: 'Họ và tên',
    Salary: 'Lương',
    State: 'Trạng thái',
    Description: 'Miêu tả',
    HistoryPayment: 'Lịch sử thanh toán',
    DateOfBirth: 'Ngày sinh',
    Sex: 'Giới tính',
    PhoneNumber: 'Số điện thoại',
    Address: 'Địa chỉ',
    Email: 'Email',
    Position: 'Chức vụ',
    Department: 'Phòng ban',
    Employee: 'Nhân viên',
    SalaryBonus: 'Lương Bonus',
    Sum: "Tổng",
  }
};

@Injectable()
export class Localization {

  locale: string = '';

  locales: Locale[] = [];

  payments: any[] = [];

  constructor(private router: Router)
  {
    this.locale = this.getLocale();
    this.payments = this.getPayments();
    this.locales = this.getLocales();

    this.initMessages();
    locale(this.locale);
  }


  formatMessage = formatMessage;

  getPayments() {
    return payments;
  }

  getLocales() {
    return locales;
  }

  getDictionary() {
    return dictionary;
  }

  ngOnInit() {
  }


  initMessages() {
    loadMessages(deMessages);
    loadMessages(ruMessages);
    loadMessages(this.getDictionary());
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
