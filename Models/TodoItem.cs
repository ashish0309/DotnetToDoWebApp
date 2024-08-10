using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApp.Models;
public class TodoItem
{
  public long Id { get; set; }
  public string? Name { get; set; }
  public bool IsComplete { get; set; }

 [ForeignKey("TodoUser")]
  public string? TodoUserId { get; set; }

 public virtual TodoUser? TodoUser { get; set; }
}