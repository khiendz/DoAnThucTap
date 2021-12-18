export class Nhanvien {
    public  MaNhanVien:string;
    public  TenNhanVien:string;
    public  NgaySinh:Date;
    public  GioiTinh:number;
    public  SoDienThoai:string;
    public  DiaChi:string ;
    public  Email:string ;
    public  MaChucVu:string ;
    public  MaPhongBan:string ;

    constructor(MaNhanVien:string, TenNhanVien:string, NgaySinh:Date, GioiTinh:number, SoDienThoai:string, DiaChi:string, Email:string, MaChucVu:string, MaPhongBan:string )
    {
        this.MaNhanVien  = MaNhanVien;
        this.TenNhanVien = TenNhanVien;
        this.NgaySinh = NgaySinh;
        this.GioiTinh = GioiTinh;
        this.SoDienThoai = SoDienThoai;
        this.DiaChi = DiaChi;
        this.Email = Email;
        this.MaChucVu = MaChucVu;
        this.MaPhongBan = MaPhongBan;
    }

}
