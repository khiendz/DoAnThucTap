export class HopDong {
  public  MaHopDong:string;
  public  TenHopDong:string;
  public  MaChiTietHopDong:string;
  public  MaNhanVien:string;

  constructor(MaHopDong:string, TenHopDong:string, MaChiTietHopDong:string, MaNhanVien:string)
  {
      this.MaHopDong  = MaHopDong;
      this.TenHopDong = TenHopDong;
      this.MaChiTietHopDong = MaChiTietHopDong;
      this.MaNhanVien = MaNhanVien;
  }

}
