using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MyAbpApp.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class MyAbpAppDbContextFactory : IDesignTimeDbContextFactory<MyAbpAppDbContext>
{
    public MyAbpAppDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        MyAbpAppEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<MyAbpAppDbContext>()
            .UseSqlite(configuration.GetConnectionString("Default"));
        
        return new MyAbpAppDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../MyAbpApp.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
