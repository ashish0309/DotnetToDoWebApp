
using System.Security.Claims;

namespace TodoApp.Utils;
public interface IUserProvider
{
    public string? GetUserId();
}

public class UserIdProvider(IHttpContextAccessor accessor) : IUserProvider
{
    private readonly IHttpContextAccessor _accessor = accessor;

    public string? GetUserId()
    {
        var user = _accessor.HttpContext?.User;
        if (user is not null)
        {
            var userID = user!.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = user.FindFirstValue("sub");
            Console.WriteLine("from dependency injection {0}", userId);
            return userID;
        }
        return null;
    }
}