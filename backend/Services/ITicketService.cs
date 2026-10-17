using backend.Models;

public interface ITicketService
{
    Task<List<Ticket>> GetAllAsync();
    Task<Ticket?> GetByIdAsync(int id);
    Task<Ticket> CreateAsync(CreateTicketRequest request);
    Task<Ticket?> AssignAsync(int id, int assigneeUserId);
    Task<Ticket?> UpdateStatusAsync(int id, string status);
}
