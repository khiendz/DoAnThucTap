export class LichSuLuong {
  public  maLSL:string;
  public  maNV:string;
  public  luong:number;
  public luongBonus:number;
  public  timePay:Date;
  public checkPay:boolean;
  public description: string;
  public sum:number;

  constructor(maLSL:string, maNV:string, luong:number, timePay:Date, checkPay:boolean, description:string, luongBonus:number, sum:number)
  {
      this.maLSL  = maLSL;
      this.maNV = maNV;
      this.luong = luong;
      this.timePay = timePay;
      this.checkPay = checkPay;
      this.description = description;
      this.luongBonus = luongBonus;
      this.sum = sum;
  }

}
