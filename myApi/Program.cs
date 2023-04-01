using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);
var booklibraryConnectionString = builder.Configuration["ConnectionStrings:myApiContext"];
builder.Services.AddDbContext<myApiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("myApiContext") ?? throw new InvalidOperationException("Connection string 'myApiContext' not found.")));
                                                                                                           
//var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

/* builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("https://green-flower-0ba5fcf03.2.azurestaticapps.net",
                          "https://bookslibrary.azurewebsites.net/api/Opinions","https://bookslibrary.azurewebsites.net/api/Books")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .SetIsOriginAllowed((host) => true)
                        .AllowCredentials();
                      });
}); */
// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

    

var app = builder.Build();
 app.UseSwagger();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwaggerUI();
    /* app.UseCors(opt =>{
        opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();

    } ); */
}
if (app.Environment.IsProduction())
{

    app.UseSwaggerUI();
    /* app.UseCors(opt =>{
        opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();

    } ); */
}

app.UseHttpsRedirection();
//app.UseRouting();

//app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
