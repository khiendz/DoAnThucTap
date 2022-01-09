import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Đồ Án Thực Tập: Quản Lý Nhân Sự';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
