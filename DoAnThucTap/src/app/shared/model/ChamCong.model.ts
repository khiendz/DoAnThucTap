import { Luong } from "./Luong.model";
import { Nhanvien } from "./Nhanvien.model";

export class ChamCong {
  public  MaChamCong:string;
  public  NgayChamCong:Date;
  public  TenCongViec:string;
  public  GioBatDau:Date;
  public  GioKetThuc:Date;
  public  MaNhanVien:string;
  public  MaLuong:string;
  public  maLuongNavigation: Luong;
  public  MaNhanVienNavigation: Nhanvien;

  constructor(MaChamCong:string, NgayChamCong:Date, TenCongViec:string, GioBatDau:Date, GioKetThuc: Date, MaNhanVien: string, MaLuong: string, maLuongNavigation: Luong, MaNhanVienNavigation: Nhanvien)
  {
      this.MaChamCong  = MaChamCong;
      this.NgayChamCong = NgayChamCong;
      this.TenCongViec = TenCongViec;
      this.GioBatDau = GioBatDau;
      this.GioKetThuc = GioKetThuc;
      this.MaNhanVien = MaNhanVien;
      this.MaLuong = MaLuong;
      this.maLuongNavigation = maLuongNavigation;
      this.MaNhanVienNavigation = MaNhanVienNavigation;
  }

}
