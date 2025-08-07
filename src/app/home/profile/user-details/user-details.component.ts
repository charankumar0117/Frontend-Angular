import { Component, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() name: string = 'John Doe';
  @Input() email: string = 'john.doe@example.com';
  @Input() role?: string;

  getCurrentDate(): string {
    return new Date().getFullYear().toString();
  }
}

