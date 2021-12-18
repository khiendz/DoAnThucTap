using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


namespace EmployeeManager.Models
{
    public partial class QUANLYNHANVIENContext : DbContext
    {
        public QUANLYNHANVIENContext()
        {
        }

        public QUANLYNHANVIENContext(DbContextOptions<QUANLYNHANVIENContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Chamcong> Chamcong { get; set; }
        public virtual DbSet<Chitiethopdong> Chitiethopdong { get; set; }
        public virtual DbSet<Chucvu> Chucvu { get; set; }
        public virtual DbSet<Hopdong> Hopdong { get; set; }
        public virtual DbSet<Luong> Luong { get; set; }
        public virtual DbSet<Nhanvien> Nhanvien { get; set; }
        public virtual DbSet<Phongban> Phongban { get; set; }
        public virtual DbSet<Taikhoan> Taikhoan { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer("Data Source=LAPTOP-DPS9GSGG\\SQLEXPRESS;Initial Catalog=QUANLYNHANVIEN;Integrated Security=True;");
        //    }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chamcong>(entity =>
            {
                entity.HasKey(e => e.MaChamCong);

                entity.ToTable("CHAMCONG");

                entity.Property(e => e.MaChamCong).HasMaxLength(50);

                entity.Property(e => e.GioBatDau).HasColumnType("datetime");

                entity.Property(e => e.GioKetThuc).HasColumnType("datetime");

                entity.Property(e => e.MaLuong)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.MaNhanVien)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.NgayChamCong).HasColumnType("date");

                entity.Property(e => e.TenCongViec).IsRequired();

                entity.HasOne(d => d.MaLuongNavigation)
                    .WithMany(p => p.Chamcong)
                    .HasForeignKey(d => d.MaLuong)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CHAMCONG_LUONG");

                entity.HasOne(d => d.MaNhanVienNavigation)
                    .WithMany(p => p.Chamcong)
                    .HasForeignKey(d => d.MaNhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CHAMCONG_NHANVIEN");
            });

            modelBuilder.Entity<Chitiethopdong>(entity =>
            {
                entity.HasKey(e => e.MaChiTietHopDong);

                entity.ToTable("CHITIETHOPDONG");

                entity.Property(e => e.MaChiTietHopDong).HasMaxLength(50);

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.Path).IsRequired();

                entity.Property(e => e.Size)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Chucvu>(entity =>
            {
                entity.HasKey(e => e.MaChucVu);

                entity.ToTable("CHUCVU");

                entity.Property(e => e.MaChucVu).HasMaxLength(50);

                entity.Property(e => e.TenChucVu)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Hopdong>(entity =>
            {
                entity.HasKey(e => e.MaHopDong);

                entity.ToTable("HOPDONG");

                entity.Property(e => e.MaHopDong).HasMaxLength(50);

                entity.Property(e => e.MaChiTietHopDong)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.MaNhanVien)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.TenHopDong).IsRequired();

                entity.HasOne(d => d.MaChiTietHopDongNavigation)
                    .WithMany(p => p.Hopdong)
                    .HasForeignKey(d => d.MaChiTietHopDong)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HOPDONG_CHITIETHOPDONG");

                entity.HasOne(d => d.MaNhanVienNavigation)
                    .WithMany(p => p.Hopdong)
                    .HasForeignKey(d => d.MaNhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HOPDONG_NHANVIEN");
            });

            modelBuilder.Entity<Luong>(entity =>
            {
                entity.HasKey(e => e.MaLuong);

                entity.ToTable("LUONG");

                entity.Property(e => e.MaLuong).HasMaxLength(50);

                entity.Property(e => e.Luong1).HasColumnName("Luong");

                entity.Property(e => e.MaChucVu)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.MaChucVuNavigation)
                    .WithMany(p => p.Luong)
                    .HasForeignKey(d => d.MaChucVu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LUONG_CHUCVU");
            });

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.HasKey(e => e.MaNhanVien);

                entity.ToTable("NHANVIEN");

                entity.Property(e => e.MaNhanVien).HasMaxLength(50);

                entity.Property(e => e.DiaChi)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.MaChucVu)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.MaPhongBan)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.SoDienThoai)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.TenNhanVien)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.MaChucVuNavigation)
                    .WithMany(p => p.Nhanvien)
                    .HasForeignKey(d => d.MaChucVu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NHANVIEN_CHUCVU");

                entity.HasOne(d => d.MaPhongBanNavigation)
                    .WithMany(p => p.Nhanvien)
                    .HasForeignKey(d => d.MaPhongBan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NHANVIEN_PHONGBAN");
            });

            modelBuilder.Entity<Phongban>(entity =>
            {
                entity.HasKey(e => e.MaPhongBan);

                entity.ToTable("PHONGBAN");

                entity.Property(e => e.MaPhongBan).HasMaxLength(50);

                entity.Property(e => e.TenPhongBan)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Taikhoan>(entity =>
            {
                entity.ToTable("TAIKHOAN");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.MaNhanVien)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.MaNhanVienNavigation)
                    .WithMany(p => p.Taikhoan)
                    .HasForeignKey(d => d.MaNhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAIKHOAN_NHANVIEN");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
