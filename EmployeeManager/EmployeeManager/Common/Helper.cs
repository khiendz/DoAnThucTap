using EmployeeManager.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManager.Common
{
    public class Helper
    {
        private readonly IConfiguration _configuration;
        public Helper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public static string MeasureSizeOfFile(long bytes)
        {
            if (bytes < 1024)
                return string.Format("{0} B", bytes);

            var kb = Math.Round((decimal)bytes / 1024);
            if (kb < 1024)
                return string.Format("{0} KB", kb);

            var mb = Math.Round(kb / 1024);
            return string.Format("{0} MB", mb);
        }
        public static List<Chitiethopdong> GetAllFiles(string baseFolder, string input)
        {
            var inTemplatesDir = Path.Combine(baseFolder, input);

            List<string> files = new List<string>();
            List<Chitiethopdong> fileInfo = new List<Chitiethopdong>();
            try
            {
                foreach (var file in Directory.GetFiles(inTemplatesDir))
                {
                    files.Add(file);
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
            }

            foreach (string filePath in files)
            {
                FileInfo fi = new FileInfo(filePath);
                Chitiethopdong dm = new Chitiethopdong();
                dm.MaChiTietHopDong = Guid.NewGuid().ToString();
                dm.Name = fi.Name;
                dm.Path = filePath;
                dm.Size = Helper.MeasureSizeOfFile(fi.Length);

                fileInfo.Add(dm);
            }

            //var uploadFile = new FileProtocol();
            //uploadFile.FileName = itemFile.FileName;
            //uploadFile.ContentType = itemFile.ContentType;
            //uploadFile.Content = new BinaryReader(itemFile.OpenReadStream()).ReadBytes((int)itemFile.Length);
            return fileInfo;

        }
    }
}
