import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private API_URL = 'http://localhost:8089/api/auth';
  
    constructor(private http: HttpClient) {}
  
    login(data: { email: string; password: string }): Observable<any> {
      return this.http.post(`${this.API_URL}/login`, data);
    }
  
    register(user: any): Observable<any> {
      return this.http.post(`${this.API_URL}/register`, user);
    }
  
    setToken(token: string): void {
      localStorage.setItem('token', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    logout(): void {
      localStorage.removeItem('token');
    }
  }
  