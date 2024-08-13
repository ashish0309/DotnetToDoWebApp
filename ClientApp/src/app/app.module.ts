import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component'; // Import your component here
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpUserComponent } from './signup/sign-up-user.component';
import { SignInUserComponent } from './signin/sign-in-user.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorBannerComponent } from './error/error-banner-component';

const routes: Routes = [
  { path: '', component: TodosComponent }, // Default route
  // Other routes can be added here
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    SignUpUserComponent,
    SignInUserComponent,
    NavMenuComponent,
    ProfileComponent,
    ErrorBannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: TodosComponent, pathMatch: 'full' },
      { path: 'sign-up-user', component: SignUpUserComponent },
      { path: 'sign-up-user', component: SignUpUserComponent },
      { path: 'sign-in-user', component: SignInUserComponent },
      { path: 'profile', component: ProfileComponent },
    ]),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }