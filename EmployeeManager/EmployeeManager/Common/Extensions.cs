using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace EmployeeManager.Common
{
    public static class Extensions
    {
        public static string RemoveInvalidCharacters(this string text)
        {
            if (string.IsNullOrEmpty(text)) return text;
            var c = text.ToCharArray();
            return string.Join(string.Empty, c.Where(t => t != '\u202c').ToList());
        }
        public static List<T> LoadModelsFromFolderX<T>(this string dir, string extFile = ".json", string pathProp = "PhysicalPath", bool orderByCreateTime = false)
        {
            if (!Directory.Exists(dir)) return default(List<T>);
            if (!extFile.Contains("*")) extFile = "*" + extFile;
            try
            {
                IList<T> list = new List<T>();
                Dictionary<string, PropertyInfo> _propertyMap = typeof(T)
                .GetProperties()
                .ToDictionary(
                    prop => prop.Name.ToLower(),
                    prop => prop
                );
                PropertyInfo p;
                _propertyMap.TryGetValue(pathProp.ToLower(), out p);
                var files = Directory.EnumerateFiles(dir, extFile);
                if (orderByCreateTime)
                {
                    files = files.OrderBy(r => new FileInfo(r).CreationTime);
                }
                files.ToList().ForEach(t =>
                {
                    try
                    {
                        string text = File.ReadAllText(t);
                        var objT = JsonConvert.DeserializeObject<T>(text);
                        if (p != null) p.SetValue(objT, t, null);
                        list.Add(objT);
                    }
                    catch
                    {
                        //Abandon record ERROR!
                    }
                });
                var ret = list.ToList();
                return ret;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return default(List<T>);
            }
        }
    }
}
