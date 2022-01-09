import { Injectable } from '@angular/core';

export class Employee {
  ID: number = 0;

  FirstName: string = '';

  LastName: string = '';

  Prefix: string = '';

  Position: string = '';

}

export class State {
  ID: number = 0;

  Name: string = '';
}

const employees: Employee[] = [{
  ID: 1,
  FirstName: 'Nguyễn Đình Khiển',
  LastName: 'Bảo vệ',
  Prefix: 'Phòng soi cam.',
  Position: '100000đ'
}, {
  ID: 2,
  FirstName: 'Nguyễn Viết Lộc',
  LastName: 'Tổng giám đốc',
  Prefix: 'Phòng CEO.',
  Position: '10000000000đ',
}, {
  ID: 3,
  FirstName: 'Nguyễn Đăng Mạnh',
  LastName: 'Chủ tịch',
  Prefix: 'Phòng chủ tịch',
  Position: '10000000000đ',
}, {
  ID: 4,
  FirstName: 'Greta',
  LastName: 'Sims',
  Prefix: 'Ms.',
  Position: '200000000đ',
}, {
  ID: 5,
  FirstName: 'Brett',
  LastName: 'Wade',
  Prefix: 'Mr.',
  Position: '200000000đ',
}, {
  ID: 6,
  FirstName: 'Sandra',
  LastName: 'Johnson',
  Prefix: 'Mrs.',
  Position: '200000000đ',
}, {
  ID: 7,
  FirstName: 'Kevin',
  LastName: 'Carter',
  Prefix: 'Mr.',
  Position: '200000000đ',
}, {
  ID: 8,
  FirstName: 'Cynthia',
  LastName: 'Stanwick',
  Prefix: 'Ms.',
  Position: '200000000đ',
}, {
  ID: 9,
  FirstName: 'Kent',
  LastName: 'Samuelson',
  Prefix: 'Dr.',
  Position: '200000000đ',
}];

@Injectable()
export class ServiceTinhLuong {
  getEmployees() {
    return employees;
  }

  // getStates() {
  //   return states;
  // }
}
