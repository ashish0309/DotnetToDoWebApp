using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.DBContexts;
using TodoApp.Models;
using TodoApp.Utils;

namespace ToDoApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController(TodoContext context, IUserProvider userProvider) : Controller
{
    private readonly TodoContext _context = context;
    private readonly IUserProvider _userProvider = userProvider;

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<TodoItem>>> Get()
    {
        var todoItems = await _context.TodoItems.ToListAsync();
        Console.WriteLine("fetched todoitems {0}", todoItems);
        return todoItems;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<TodoItem>> Post(TodoItem todoItem)
    {
        Console.WriteLine("Adding items: {0}", _userProvider.GetUserId());
        todoItem.TodoUserId = _userProvider.GetUserId();
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = todoItem.Id }, todoItem);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(long id)
    {
        Console.WriteLine("starting delete");
        if (_context.TodoItems == null)
        {
            Console.WriteLine("could not find any todos");
            return NotFound();
        }
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            Console.WriteLine("could not find specific todo");
            return NotFound();
        }
        Console.WriteLine(todoItem);
        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
    {
        if (id != todoItem.Id)
        {
            return BadRequest();
        }
        try
        {
            todoItem.TodoUserId = _userProvider.GetUserId();
            _context.Entry(todoItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {

            throw;
        }
        return NoContent();
    }
}
