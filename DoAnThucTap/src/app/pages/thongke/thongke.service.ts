import { Injectable } from '@angular/core';

export class Population {
  arg: number = 0;

  val: number = 0;
}

export class Product {
  ID: number = 0;
​
  Name: string = '';
​
  Price: number = 0;
​
  Current_Inventory: number = 0;
​
  Backorder: number = 0;
​
  Manufacturing: number = 0;
​
  Category: string = '';
​
  ImageSrc: string = '';
}
const populationData: Population[] = [{
  arg: 1,
  val: 3032019978,
}, {
  arg: 2,
  val: 3683676306,
}, {
  arg: 3,
  val: 4434021975,
}, {
  arg: 4,
  val: 5281340078,
}, {
  arg: 5,
  val: 6115108363,
}, {
  arg: 6,
  val: 6922947261,
}, {
  arg: 7,
  val: 7795000000,
}];

const simpleProducts: string[] = [
  'Chấm Cônn',
  'Danh sách nhân viên',
  'Danh sách phòng ban',
  'Danh sách chức vụ',
  'Danh sách bảng lương',
  'Danh sách hợp đồng',
];

@Injectable()
export class ThongKeService {
  getPopulationData(): Population[] {
    return populationData;
  }
  getSimpleProducts(): string[] {
    return simpleProducts;
  }
}

