import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';


interface Data{
    email:string,
    status:string,
    token:string,
    id:string,
    role:string
}

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  isvalid=signal<boolean>(false);

  constructor(private router: Router,private http:HttpClient) {}

  login() {
    console.log('Login clicked with:', this.email, this.password);
    

    this.http.post<Data>('api/auth/login',{
        email:this.email,
        password:this.password
    }).subscribe({
        next :(data:Data)=>{
          console.log(data.token)
          localStorage.setItem("token",data.token) 
          localStorage.setItem("id",data.id)
          localStorage.setItem("role",data.role)
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          console.log(err.error.message)
          this.isvalid.set(true)
        }
    })
     


  }

  goToSignup() {
    this.router.navigate(['/register']);
  }
}
