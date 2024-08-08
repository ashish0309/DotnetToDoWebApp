import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component'; // Import your component here
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: TodosComponent }, // Default route
  // Other routes can be added here
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [  
    RouterModule.forRoot([
      { path: '', component: TodosComponent, pathMatch: 'full' }
    ]),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }