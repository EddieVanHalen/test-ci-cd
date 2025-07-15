namespace Backend.Domain.Models;

public class User
{
    public Guid Id { get; set; } = Guid.Empty;
    public string Nickname { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
