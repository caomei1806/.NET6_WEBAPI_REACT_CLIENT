using JobBoardServer.Data;
using JobBoardServer.Models;
using JobBoardServer.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(c => { c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin()); });


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddMvc();
builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateActor = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IJobsService, JobsService>();




var app = builder.Build();

// Configure the HTTP request pipeline.



app.UseSwagger();

app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.MapGet("/jobs", async (IJobsService service) => await service.GetJobsAsync())
    .WithTags("Jobs Endpoints");

app.MapGet("/jobs/{jobId}", async (int jobId, IJobsService service) =>
{
    Job jobToReturn = await service.GetJobByIdAsync(jobId);
    if (jobToReturn != null)
    {
        return Results.Ok(jobToReturn);
    }
    else
    {
        return Results.NotFound("Jobs not found");

    }

}).WithTags("Jobs Endpoints");
app.MapPost("/jobs-create", [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")] async (Job jobToCreate,IJobsService service) =>
{
    bool createSuccess = await service.CreateJobAsync(jobToCreate);
    if (createSuccess)
    {
        return Results.Ok("Create success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.MapPut("/jobs-update", [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")] async (Job jobToUpdate, IJobsService service) =>
{
    bool updateSuccess = await service.UpdateJobAsync(jobToUpdate);
    if (updateSuccess)
    {
        return Results.Ok("Update success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.MapDelete("/jobs-delete/{jobId}", [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")] async (int jobId, IJobsService service) =>
{
    
    bool deleteSuccess = await service.DeleteJobAsync(jobId);
    if (deleteSuccess)
    {
        return Results.Ok("Delete success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = String.Empty;
});

app.Run();
