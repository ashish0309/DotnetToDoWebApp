import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { TodosComponent } from './app/todos/todos.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
