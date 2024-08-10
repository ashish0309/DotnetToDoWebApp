import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.css']
})
export class SignUpUserComponent {

  public registerUserForm: FormGroup;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private formBuilder: FormBuilder, private router: Router) {
    this.registerUserForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  public registerUser(): void {
    const formValues = this.registerUserForm.value;
    const todoUser: TodoUser = { username: formValues.email!, email: formValues.email!, phonenumber: "+443443343343" };
    const loginRequest: RegisterUser = { user: todoUser, password: formValues.password!, confirmpassword: formValues.password! };
    console.log(loginRequest);
    this.http.post<RegisteredUserResponse>(this.baseUrl + 'account/signup', loginRequest).subscribe({
      error: (httpError: HttpErrorResponse) => {
        // any API error handling logic goes here (e.g. for http codes 4xx and 5xx)
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`)
      },
      next: (todoUser: RegisteredUserResponse) => {
        console.log("login successful", todoUser.email);
        localStorage.setItem('user_email', todoUser.email);
        this.router.navigate(['']);
      }
    });
  }
}

interface TodoUser {
  username: string,
  email: string,
  phonenumber: string,
}

interface RegisterUser {
  user: TodoUser,
  password: string,
  confirmpassword: string,
}

interface RegisteredUserResponse {
  email: string
}
