namespace Backend.DataAccess.Entities;

public class UserEntity
{
    public Guid Id { get; set; }
    public string Nickname { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
