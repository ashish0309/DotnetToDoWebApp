namespace TodoApp.Models;

public class UserRegistration
{
    public TodoUser? User { get; set; }

    public string? Password { get; set; }

    public string? ConfirmPassword { get; set; }
}