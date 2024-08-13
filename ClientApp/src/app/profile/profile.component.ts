import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  getUserEmail(): string | null {
    const email = localStorage.getItem("user_email");
    return email
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private  errorService: ErrorService) {

  }

  public signOutUser(): void {
    const token = localStorage.getItem("token");
    console.log('logout token', token);
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
    //const authHeader =  new HttpHeaders().set('Authorization', `Bearer ${token}`, 'Content-Type': 'application/json');
    this.http.post<any>(this.baseUrl + 'account/logout', null).subscribe({
      error: (httpError: HttpErrorResponse) => {
        // any API error handling logic goes here (e.g. for http codes 4xx and 5xx)
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        this.errorService.showError(`Error ${httpError.status}: ${httpError.statusText}`);
      },
      next: (response: any) => {
        // any API success handling logic goes here (e.g. for http codes 2xx and 3xx)
        console.log('signout', response);
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
}
