using EmployeeManager.Authentication;
using EmployeeManager.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.DAL
{
    public class DBcontext : DbContext
    {
        public DbSet<Luong> Luong { get; set; }
        public DbSet<CHAMCONG> ChamCong { get; set; }
        public DBcontext(DbContextOptions<DBcontext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Luong>()
            .HasKey(p => p.maLuong);

            builder.Entity<Luong>()
           .Property(p => p.maLuong)
           .IsConcurrencyToken();

            builder.Entity<CHAMCONG>()
            .HasKey(p => p.maChamCong);

            builder.Entity<Luong>()
           .Property(p => p.luong)
           .IsConcurrencyToken();
        }
    }
}
