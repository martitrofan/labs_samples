using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<ITicketService, TicketService>();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

// Health endpoint
app.MapGet("/health", () => Results.Ok("ok"));

// Info endpoint
app.MapGet("/info", () => Results.Ok(new
{
    name = "Repair Management API",
    environment = app.Environment.EnvironmentName,
    version = "ЛР7 — каркас Web API"
}));

app.Run();
