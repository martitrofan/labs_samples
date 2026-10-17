using backend.Models;

public class TicketService : ITicketService
{
    private readonly List<Ticket> _tickets = new();
    private int _nextId = 1;

    public Task<List<Ticket>> GetAllAsync()
    {
        return Task.FromResult(_tickets.ToList());
    }

    public Task<Ticket?> GetByIdAsync(int id)
    {
        var ticket = _tickets.FirstOrDefault(t => t.Id == id);
        return Task.FromResult(ticket);
    }

    public Task<Ticket> CreateAsync(CreateTicketRequest request)
    {
        var ticket = new Ticket
        {
            Id = _nextId,
            Number = $"RM-{_nextId:D3}",
            Title = request.Title,
            SiteId = request.SiteId,
            Description = request.Description,
            Status = "New"
        };
        _tickets.Add(ticket);
        _nextId++;
        return Task.FromResult(ticket);
    }

    public Task<Ticket?> AssignAsync(int id, int assigneeUserId)
    {
        var ticket = _tickets.FirstOrDefault(t => t.Id == id);
        if (ticket != null)
        {
            ticket.AssigneeUserId = assigneeUserId;
        }
        return Task.FromResult(ticket);
    }

    public Task<Ticket?> UpdateStatusAsync(int id, string status)
    {
        var ticket = _tickets.FirstOrDefault(t => t.Id == id);
        if (ticket != null)
        {
            ticket.Status = status;
        }
        return Task.FromResult(ticket);
    }
}
