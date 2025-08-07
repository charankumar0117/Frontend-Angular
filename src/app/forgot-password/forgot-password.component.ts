import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports:[FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';

  onSubmit() {
    console.log('Email:', this.email);
    console.log('New Password:', this.newPassword);
    // Here you would call your backend API to reset the password
  }
}
