export class TaiKhoan {
  public  Id:string;
  public  UserName:string;
  public  Password:string;
  public  Role:string;
  public  MaNhanVien:string;

  constructor(Id:string, UserName:string, Password:string, Role:string, MaNhanVien:string)
  {
      this.Id  = Id;
      this.UserName = UserName;
      this.Password = Password;
      this.Role = Role;
      this.MaNhanVien = MaNhanVien;
  }

}
