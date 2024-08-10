import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.css']
})
export class SignInUserComponent {

  public signInUserForm: FormGroup;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private formBuilder: FormBuilder, private router: Router) {
    this.signInUserForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  public signInUser(): void {
    const formValues = this.signInUserForm.value;
    const loginRequest: LoginRequest = { email: formValues.email!, password: formValues.password! };
    console.log(loginRequest);
    SignInUserComponent.signInPostRequest(this.http, this.baseUrl, loginRequest, this.router);
    //SignInUserComponent.getUser(this.http,this.baseUrl );
  }

  public registerUser(): void {
    this.router.navigate(['/sign-up-user']);
  }

  public static signInPostRequest(httpClient: HttpClient, baseURL: string, loginRequest: LoginRequest, router: Router): void {
    httpClient.post<SignedInUserResponse>(baseURL + 'account/signin', loginRequest, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe({
      error: (httpError: HttpErrorResponse) => {
        // any API error handling logic goes here (e.g. for http codes 4xx and 5xx)
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`)
      },
      next: (response: SignedInUserResponse) => {
        console.log('sign in response value', response);
        localStorage.setItem("user_email", response.email);
        router.navigate(['/']);
      }
    });
  }

  private static getHeader() {
    const token = localStorage.getItem("token");
    const authHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return { headers: authHeader };
  }
}

interface LoginRequest {
  email: string,
  password: string,
}

interface SignedInUserResponse {
  email: string
}


