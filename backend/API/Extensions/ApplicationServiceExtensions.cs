using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using API.Core;
using API.Persistance;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                });

            services.AddDbContext<DataContext>(opt =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                string connString;

                if (env == "Development")
                {
                    connString = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    connString = Environment.GetEnvironmentVariable("DATABASE_URL");
                }

                opt.UseNpgsql(connString);
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                    {
                        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("*");
                    });
            });

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}
