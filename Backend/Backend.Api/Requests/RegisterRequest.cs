namespace Backend.Api.Requests;

public class RegisterRequest
{
    public string Nickname { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
