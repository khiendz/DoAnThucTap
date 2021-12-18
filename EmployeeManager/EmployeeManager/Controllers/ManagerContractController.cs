using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using EmployeeManager.Common;
using EmployeeManager.Models;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ManagerContractController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly QUANLYNHANVIENContext _context;

        public ManagerContractController(IConfiguration configuration, QUANLYNHANVIENContext context)
        {
            _context = context;
            _configuration = configuration;
        }
       
        [HttpGet]
        [Route("get")]
        public List<Chitiethopdong> Get()
        {
            return Helper.GetAllFiles(_configuration["AppSetting:BaseFolder"], _configuration["AppSetting:InputTemplateFolder"]);
        }
        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<Hopdong>> PostContract(Hopdong contract)
        {
            contract.MaHopDong = Guid.NewGuid().ToString();
            _context.Hopdong.Add(contract);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContract", new { id = contract.MaHopDong }, contract);
        }

        //[HttpPost]
        //[Route("upload")]
        //public async Task<ActionResult<Chitiethopdong>> UploadDocuments()
        //{
        //    string inputPath = Path.Combine(_configuration["AppSetting:BaseFolder"], _configuration["AppSetting:InputTemplateFolder"]);
        //    var files = Request.Form.Files;
        //    files.ToList().ForEach(t =>
        //    {
        //        var extension = Path.GetExtension(t.FileName);

        //        if (extension.Trim().ToLower() == ".pdf")
        //        {
        //            var filePath = Path.Combine(inputPath, t.FileName).RemoveInvalidCharacters();
        //            var fileBytes = new BinaryReader(t.OpenReadStream()).ReadBytes((int)t.Length);
        //            if (System.IO.File.Exists(filePath))
        //            {
        //                System.IO.File.Delete(filePath);
        //            }
        //            System.IO.File.WriteAllBytes(filePath, fileBytes);
        //        }

        //        Chitiethopdong dc = new Chitiethopdong();
        //        dc.MaChiTietHopDong = Guid.NewGuid().ToString();
        //        dc.Name = t.FileName;
        //        dc.Path = Helper.MeasureSizeOfFile(t.Length);
        //        dc.Path = Path.Combine(inputPath, t.FileName);
        //        _context.Chitiethopdong.Add(dc);
        //        await _context.SaveChangesAsync();
        //        return CreatedAtAction("GetContact", new { id = dc.MaChiTietHopDong }, dc);
        //    });
        //}
        [HttpPost]
        [Route("delete")]
        public async Task<Models.ApiResponse<bool>> DeleteDocument([FromBody] Chitiethopdong doc)
        {
            var filePath = doc.Path;
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            return new Models.ApiResponse<bool>
            {
                Data = true
            };
        }
        [HttpPost]
        [Route("download")]
        public IActionResult DownloadDocument([FromBody] Chitiethopdong doc)
        {
            var filePath = doc.Path;
            filePath = filePath.RemoveInvalidCharacters();
            if (!System.IO.File.Exists(filePath)) return null;
            var pdfFileData = System.IO.File.ReadAllBytes(filePath);
            return new FileContentResult(pdfFileData, "application/pdf");
        }
    }
}
