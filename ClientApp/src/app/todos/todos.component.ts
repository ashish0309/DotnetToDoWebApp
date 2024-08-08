import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  public todo = "not fetcheds";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,) {
    this.todo = this.fetchTodos();
  }

  private fetchTodos(): string {
    this.http.get<TodoName | null>(this.baseUrl + 'todos').subscribe({
      next: (success_result) => {
        this.todo = success_result?.message ?? "";
      }, error: (error) => {
        console.error("error message", error);
      }, complete: () => {
        console.log('completed api call');
      }
    });
    return this.todo;
  }
}

interface TodoName {
  message: string
}
