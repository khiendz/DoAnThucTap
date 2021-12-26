export class QuaTrinhLamViec {
  public  MaQuaTrinhLamViec:string;
  public  MaNhanVien:string;
  public  ThoiGianBatDau:Date;
  public  ThoiGianKetThuc:Date;
  public  MaChucVu:string;
  public  MaPhongBan:string;
  public  MoTaCongViec:string;

  constructor(MaQuaTrinhLamViec:string, MaNhanVien:string, ThoiGianBatDau:Date, ThoiGianKetThuc:Date, MaChucVu:string, MaPhongBan:string, MoTaCongViec:string)
  {
      this.MaQuaTrinhLamViec  = MaQuaTrinhLamViec;
      this.MaNhanVien = MaNhanVien;
      this.ThoiGianBatDau = ThoiGianBatDau;
      this.ThoiGianKetThuc = ThoiGianKetThuc;
      this.MaChucVu = MaChucVu;
      this.MaPhongBan = MaPhongBan;
      this.MoTaCongViec = MoTaCongViec;

  }

}
