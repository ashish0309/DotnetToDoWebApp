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


     [HttpDelete("{id}")]
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

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
    {
        if (id != todoItem.Id)
        {
            return BadRequest();
        }
        try
        {
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
