using System.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TodoApp.DBContexts;
using TodoApp.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
var mysqlConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (mysqlConnectionString == null)
{
    throw new Exception("Mysql connection string can not be null");
}
builder.Services.AddDbContext<TodoContext>(opt =>
     opt.UseMySQL(mysqlConnectionString));
builder.Services.AddDbContext<TodoUserDBContext>(opt =>
opt.UseMySQL(mysqlConnectionString));
builder.Services.AddIdentity<TodoUser, TodoRole>(options => { options.SignIn.RequireConfirmedAccount = false; options.SignIn.RequireConfirmedEmail = false; })
    .AddEntityFrameworkStores<TodoUserDBContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    // Cookie settings
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.SlidingExpiration = true;
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
