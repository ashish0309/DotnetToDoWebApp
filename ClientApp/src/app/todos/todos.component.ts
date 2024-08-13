import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ErrorService } from '../error/error-service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  public todos: TodoItem[] = [];
  public todoToEdit: TodoItem | null = null;

  public addTodoForm: FormGroup;
  public editTodoForm: FormGroup;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private formBuilder: FormBuilder, private router: Router,
    private errorService: ErrorService) {
    this.addTodoForm = this.formBuilder.group({
      name: '',
      isComplete: false,
    });
    this.editTodoForm = this.formBuilder.group({
      id: this.todoToEdit?.id!,
      editing_name: this.todoToEdit?.name!,
      isComplete: this.todoToEdit?.isComplete ?? false,
    });
    console.log('localStorage.getItem(', localStorage.getItem('user_email'));
    if (localStorage.getItem('user_email') == null) {
      router.navigate(['/sign-in-user']);
      return;
    }
    this.fetchTodos();
  }

  private fetchTodos() {
    this.http.get<TodoItem[] | null>(this.baseUrl + 'todos').subscribe({
      next: (success_result) => {
        this.todos = success_result ?? [];
      }, error: (error) => {
        console.error("error message", error);
        if (error.statusCode == 401) {
          console.log('clearing local storage');
          localStorage.clear();
          this.router.navigate(['/sign-in-user']);
        }
        this.errorService.showError(`Error ${error.status}: ${error.statusText}`);
      }, complete: () => {
        console.log('completed api call');
      }
    });
  }

  public addToDo(): void {
    console.warn('New to do added', this.addTodoForm?.value);
    const token = localStorage.getItem("token");
    this.http.post<TodoItem>(this.baseUrl + 'todos', { name: this.addTodoForm?.value.name!, isComplete: false }).
      subscribe({
        next: (toDoItem) => {
          this.todos.push(toDoItem);
          this.addTodoForm?.reset();
        }, error: (error) => {
          this.errorService.showError(`Error ${error.status}: ${error.statusText}`);
        }
      });
  }

  public editTodo(id: number): void {
    console.warn('Deleting', id !== this.todoToEdit?.id ? 'correct' : 'wrong');
    const editTodoFormValues = this.editTodoForm.value;
    console.warn('edit todo ', editTodoFormValues);
    const newTodoItem: TodoItem = { name: editTodoFormValues.editing_name!, isComplete: editTodoFormValues.isComplete!, id: id };
    this.http.put(this.baseUrl + 'todos/' + id, newTodoItem).subscribe({
      next: (updatedToDoItem) => {
        const index = this.todos.findIndex(todoItem => todoItem.id === id);
        this.todos.splice(index, 1, newTodoItem);
        this.todoToEdit = null;
      }, error: (error) => {
        this.errorService.showError(`Error ${error.status}: ${error.statusText}`);
      }
    });
  }

  public updateTodoForEdit(todoItem: TodoItem): void {
    console.warn('todo for editing', todoItem);
    this.todoToEdit = { name: todoItem.name, id: todoItem.id, isComplete: todoItem.isComplete };
  }

  public deleteTodo(id: number): void {
    console.warn('Deleting', id);
    this.http.delete(this.baseUrl + 'todos/' + id).subscribe(
      {
        next: (response) => {
          let pastTodos = this.todos;
          pastTodos = pastTodos.filter(todo => todo.id != id);
          this.todos = pastTodos;
          return response;
        }, error: (error) => {
          this.errorService.showError(`Error ${error.status}: ${error.statusText}`);
        }
      });
  }
}

interface TodoItem {
  name: string,
  isComplete: boolean,
  id: number
}

