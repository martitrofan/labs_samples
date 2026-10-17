namespace backend.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Number { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int SiteId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "New";
    public int? CreatedByUserId { get; set; }
    public int? AssigneeUserId { get; set; }
}

public class CreateTicketRequest
{
    public string Title { get; set; } = string.Empty;
    public int SiteId { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class AssignRequest
{
    public int AssigneeUserId { get; set; }
}

public class StatusRequest
{
    public string Status { get; set; } = string.Empty;
}
