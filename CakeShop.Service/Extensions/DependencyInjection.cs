using CakeShop.Persistence.Context;
using CakeShop.Persistence.Repositories;
using CakeShop.Service.Email;
using CakeShop.Service.Menu;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CakeShop.Service.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddCakeShopServices(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CakeShopDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IMenuRepository, MenuRepository>();
        services.AddScoped<IMenuService, MenuService>();

        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        services.AddScoped<IEmailService, EmailService>();

        return services;
    }
}