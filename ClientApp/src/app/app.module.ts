import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component'; // Import your component here
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

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
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: TodosComponent, pathMatch: 'full' }
    ]),
 

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }