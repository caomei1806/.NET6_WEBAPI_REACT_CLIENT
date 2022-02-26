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

builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1.0", new OpenApiInfo { Title = "ASP.NET React JobBoard", Version = "v1.0" });
});

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
builder.Services.AddSingleton<JobsService>();
builder.Services.AddSingleton<IUserService, UserService>();




var app = builder.Build();

// Configure the HTTP request pipeline.



app.UseSwagger();

app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();



app.MapGet("/jobs", async () => await JobsService.GetJobsAsync())
    .WithTags("Jobs Endpoints");

app.MapGet("/jobs/{jobId}", async (int jobId) =>
{
    Job jobToReturn = await JobsService.GetJobByIdAsync(jobId);
    if (jobToReturn != null)
    {
        return Results.Ok(jobToReturn);
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");
app.MapPost("/jobs-create", [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")] async (Job jobToCreate) =>
{
    bool createSuccess = await JobsService.CreateJobAsync(jobToCreate);
    if (createSuccess)
    {
        return Results.Ok("Create success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");


app.MapPost("/login", async (UserLogin user, IUserService service) => Login(user, service));

app.MapPut("/jobs-update", [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")] async (Job jobToUpdate) =>
{
    bool updateSuccess = await JobsService.UpdateJobAsync(jobToUpdate);
    if (updateSuccess)
    {
        return Results.Ok("Update success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.MapDelete("/jobs-delete/{jobId}", [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")] async (int jobId) =>
{
    bool deleteSuccess = await JobsService.DeleteJobAsync(jobId);
    if (deleteSuccess)
    {
        return Results.Ok("Delete success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

IResult Login(UserLogin user, IUserService service)
{
    if (!string.IsNullOrEmpty(user.EmailAddress) && !string.IsNullOrEmpty(user.Password))
    {
        var loggedInUser = service.Get(user);
        if (loggedInUser == null) return Results.NotFound("User not found");

        var claims = new[]{
                    new Claim(ClaimTypes.NameIdentifier, loggedInUser.EmailAddress),
                    new Claim(ClaimTypes.GivenName, loggedInUser.FirstName),
                    new Claim(ClaimTypes.Surname, loggedInUser.LastName),
                    new Claim(ClaimTypes.Role, loggedInUser.Role),
                };
        var token = new JwtSecurityToken(
            issuer: builder.Configuration["Jwt:Issuer"],
            audience: builder.Configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(60),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),SecurityAlgorithms.HmacSha256)
            );
        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
        return Results.Ok(tokenString);
    }
    return Results.BadRequest("Invalid user credentials");
}

app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NET React JobBoard";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1.0/swagger.json", "Web API serving Job model");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.Run();
