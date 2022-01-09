export class LichSuLuong {
  public  maLSL:string;
  public  maNV:string;
  public  luong:number;
  public  timePay:Date;
  public checkPay:boolean;
  public description: string;

  constructor(maLSL:string, maNV:string, luong:number, timePay:Date, checkPay:boolean, description:string)
  {
      this.maLSL  = maLSL;
      this.maNV = maNV;
      this.luong = luong;
      this.timePay = timePay;
      this.checkPay = checkPay;
      this.description = description;
  }

}
