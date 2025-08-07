import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: 'STUDENT' | 'INSTRUCTOR' = 'STUDENT';

  constructor(private router: Router,private http:HttpClient, private toastService: ToastService
  ) {}

  signup() {
    console.log('Signup clicked with:', {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    });

    this.http.post<{message:string,status:string,token:string}>('api/auth/register',{
      email:this.email,
      password:this.password,
      role:this.role,
      name:this.name
  }).subscribe({
      
      next :(data)=>{
          console.log(data)
          localStorage.setItem("token",data.token)
          this.toastService.showSuccess('Signup Successful', 'Account created successfully! Redirecting to login...');
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 1500);
      },
      error:(error)=>{
        console.log(error.error.message)
        const errorMessage = error.error?.message || 'Email already registered or signup failed. Please try again.';
        this.toastService.showError('Signup Failed', errorMessage);
      }
  })
     
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
