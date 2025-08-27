using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MyAbpApp.Web.Helpers
{
    public static class ReactBundleHelper
    {
        private static string? _singleJsFilePath;
        private static string? _singleCssFilePath;

        public static List<string> GetScriptFiles()
        {
            return GetFiles("*.js", "js");
        }

        public static List<string> GetStyleFiles()
        {
            return GetFiles("*.css", "css");
        }

        public static string GetSingleJsFile()
        {
            if (!string.IsNullOrEmpty(_singleJsFilePath))
            {
                return _singleJsFilePath;
            }

            var folderPath = Path.Combine("wwwroot", "react-bundles", "js");
            
            if (!Directory.Exists(folderPath))
            {
                return string.Empty;
            }

            var jsFiles = Directory.GetFiles(folderPath, "main.*.js");
            if (jsFiles.Length > 0)
            {
                var fileName = Path.GetFileName(jsFiles[0]);
                _singleJsFilePath = $"/react-bundles/js/{fileName}";
                return _singleJsFilePath;
            }

            return string.Empty;
        }

        public static string GetSingleCssFile()
        {
            if (!string.IsNullOrEmpty(_singleCssFilePath))
            {
                return _singleCssFilePath;
            }

            var folderPath = Path.Combine("wwwroot", "react-bundles", "css");
            
            if (!Directory.Exists(folderPath))
            {
                return string.Empty;
            }

            var cssFiles = Directory.GetFiles(folderPath, "main.*.css");
            if (cssFiles.Length > 0)
            {
                var fileName = Path.GetFileName(cssFiles[0]);
                _singleCssFilePath = $"/react-bundles/css/{fileName}";
                return _singleCssFilePath;
            }

            return string.Empty;
        }

        public static string GetMainJsFileName()
        {
            var folderPath = Path.Combine("wwwroot", "react-bundles", "js");
            if (!Directory.Exists(folderPath))
            {
                return string.Empty;
            }
            var jsFiles = Directory.GetFiles(folderPath, "main.*.js");
            if (jsFiles.Length > 0)
            {
                var newest = jsFiles
                    .Select(f => new FileInfo(f))
                    .OrderByDescending(f => f.LastWriteTimeUtc)
                    .First();
                return newest.Name;
            }
            return string.Empty;
        }

        private static List<string> GetFiles(string searchPattern, string subfolder)
        {
            var folderPath = Path.Combine("wwwroot", "react-bundles", subfolder);
            var files = new List<string>();

            if (!Directory.Exists(folderPath))
            {
                return files;
            }

            var matchedFiles = Directory.GetFiles(folderPath, searchPattern);
            foreach (var filePath in matchedFiles)
            {
                var fileName = Path.GetFileName(filePath);
                files.Add($"/react-bundles/{subfolder}/{fileName}");
            }

            return files;
        }
    }
}