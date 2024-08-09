using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.DBContexts;
using TodoApp.Models;
using ToDoApp.Models;

namespace ToDoApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController(TodoContext context) : Controller
{
    private readonly TodoContext _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> Get()
    {
        return await _context.TodoItems.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> Post(TodoItem todoItem)
    {
        Console.WriteLine("Adding items");
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = todoItem.Id }, todoItem);
    }
}
