using CakeShop.Persistence.Context;
using CakeShop.Persistence.Repositories;
using CakeShop.Service.Email;
using CakeShop.Service.Menu;
using CakeShop.Service.Options;
using CakeShop.Service.Order;
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

        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IOrderService, OrderService>();

        services.AddScoped<IOptionsRepository, OptionsRepository>();
        services.AddScoped<IOptionsService, OptionsService>();

        return services;
    }
}