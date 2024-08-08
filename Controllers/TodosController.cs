using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models;

namespace ToDoApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public TodosController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    // GET api/yourcontrollername
    [HttpGet]
    public ActionResult Get()
    {
        return Ok(new { Message = "No todos yet, and this message is being sent by dotnet backend!" });
    }
}
