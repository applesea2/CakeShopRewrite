using CakeShop.Persistence.Context;
using CakeShop.Persistence.Repositories;
using CakeShop.Service;
using CakeShop.Service.Menu;
using CakeShop.Service.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCakeShopServices(builder.Configuration);

var allowedOrigins = builder.Configuration.GetSection("AllowedCorsOrigins").Get<string[]>()
    ?? ["http://localhost:5173"];

builder.Services.AddCors(options => {
    options.AddPolicy("AllowedOrigins", policy => {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowedOrigins");
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();
