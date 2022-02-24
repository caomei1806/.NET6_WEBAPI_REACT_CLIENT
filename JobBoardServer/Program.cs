using JobBoardServer.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1.0", new OpenApiInfo { Title = "ASP.NET React JobBoard", Version = "v1.0" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NET React JobBoard";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1.0/swagger.json", "Web API serving Job model");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/jobs", async () => await JobsRepository.GetJobsAsync())
    .WithTags("Jobs Endpoints");

app.MapGet("/jobs/{jobId}", async (int jobId) =>
{
    Job jobToReturn = await JobsRepository.GetJobByIdAsync(jobId);
    if(jobToReturn != null)
    {
        return Results.Ok(jobToReturn);
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.MapPost("/jobs-create", async (Job jobToCreate) =>
{
    bool createSuccess = await JobsRepository.CreateJobAsync(jobToCreate);
    if (createSuccess)
    {
        return Results.Ok("Create success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.MapPut("/jobs-update", async (Job jobToUpdate) =>
{
    bool updateSuccess = await JobsRepository.UpdateJobAsync(jobToUpdate);
    if (updateSuccess)
    {
        return Results.Ok("Update success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.MapDelete("/jobs-delete/{jobId}", async (int jobId) =>
{
    bool deleteSuccess = await JobsRepository.DeleteJobAsync(jobId);
    if (deleteSuccess)
    {
        return Results.Ok("Delete success");
    }
    else
    {
        return Results.BadRequest();

    }

}).WithTags("Jobs Endpoints");

app.Run();
