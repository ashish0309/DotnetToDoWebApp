using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using TodoApp.Models;

namespace angular_app_todo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(
        IConfiguration configuration,
        UserManager<TodoUser> userManager,
        SignInManager<TodoUser> signInManager,
        ILogger<AccountController> logger) : ControllerBase
{
    private readonly IConfiguration _configuration = configuration;
    private readonly UserManager<TodoUser> _userManager = userManager;
    private readonly SignInManager<TodoUser> _signInManager = signInManager;
    private readonly ILogger<AccountController> _logger = logger;

    [HttpPost("signup")]
    public async Task<ActionResult> RegisterUser(UserRegistration userRegistration)
    {
        try
        {
            var result = await _userManager.CreateAsync(userRegistration.User!, userRegistration.Password!);
            Console.WriteLine("Name: {0}", result);
            if (result.Succeeded)
            {
                await _signInManager.PasswordSignInAsync(
                  userRegistration.User!,
                  userRegistration.Password!,
                  false,
                  false);
                return Ok(new { email = userRegistration.User!.Email });        // Should be CreatedAtRoute
            }
        }
        catch (Exception ex)
        {
            var errorMessage = "Invalid registrationg details " + ex.ToString();
            return BadRequest(errorMessage);
        }
        return BadRequest("Invalid registrationg details");
    }

    [HttpPost("signin")]
    public async Task<ActionResult> SignIn(LoginRequest loginRequest)
    {
        var result = await _signInManager.PasswordSignInAsync(
          loginRequest.Email!,
          loginRequest.Password!,
          false,
          false);
        if (result.Succeeded)
        {
            return Ok(new { email = loginRequest.Email! });
        }
        return BadRequest("Invalid login details");
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<ActionResult> UserLogout()
    {
        try
        {
            Console.WriteLine("Trying to loggout");
            await _signInManager.SignOutAsync();
            Console.WriteLine("loggout");
        }
        catch (Exception exc)
        {
            Console.WriteLine("Logout error {0}", exc);
            return BadRequest("Invalid login details");
        }
        return Ok(new { result = "Successfull" });
    }
}
