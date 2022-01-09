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
  FirstName: 'khien123',
  LastName: '123456',
  Prefix: 'Nguyễn Đình Khiển',
  Position: 'employee'
}, {
  ID: 2,
  FirstName: 'godloc',
  LastName: 'locphuho',
  Prefix: 'Nguyễn Viết Lộc',
  Position: 'admin',
}, {
  ID: 3,
  FirstName: 'manhbongdem',
  LastName: 'manhsnoop',
  Prefix: 'Nguyễn Đăng Mạnh',
  Position: 'admin',
}];

@Injectable()
export class ManageAccountService {
  getEmployees() {
    return employees;
  }

  // getStates() {
  //   return states;
  // }
}
