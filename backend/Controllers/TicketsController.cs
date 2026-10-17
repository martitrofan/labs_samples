using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Ticket>>> GetAll()
    {
        var tickets = await _ticketService.GetAllAsync();
        return Ok(tickets);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Ticket>> GetById(int id)
    {
        var ticket = await _ticketService.GetByIdAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }
        return Ok(ticket);
    }

    [HttpPost]
    public async Task<ActionResult<Ticket>> Create([FromBody] CreateTicketRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title) || request.Title.Length < 5 || request.Title.Length > 80)
        {
            return BadRequest(new { message = "Тема: от 5 до 80 символов" });
        }
        if (request.SiteId <= 0)
        {
            return BadRequest(new { message = "Справочник: число больше 0" });
        }
        if (string.IsNullOrWhiteSpace(request.Description) || request.Description.Length < 10 || request.Description.Length > 500)
        {
            return BadRequest(new { message = "Описание: от 10 до 500 символов" });
        }

        var ticket = await _ticketService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = ticket.Id }, ticket);
    }

    [HttpPatch("{id}/assignee")]
    public async Task<ActionResult<Ticket>> Assign(int id, [FromBody] AssignRequest request)
    {
        var ticket = await _ticketService.AssignAsync(id, request.AssigneeUserId);
        if (ticket == null)
        {
            return NotFound();
        }
        return Ok(ticket);
    }

    [HttpPatch("{id}/status")]
    public async Task<ActionResult<Ticket>> UpdateStatus(int id, [FromBody] StatusRequest request)
    {
        var validStatuses = new[] { "New", "InProgress", "Closed", "Cancelled" };
        if (!validStatuses.Contains(request.Status))
        {
            return BadRequest(new { message = "Недопустимый статус" });
        }

        var ticket = await _ticketService.UpdateStatusAsync(id, request.Status);
        if (ticket == null)
        {
            return NotFound();
        }
        return Ok(ticket);
    }
}
