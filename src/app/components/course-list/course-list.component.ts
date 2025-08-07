import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../home/admin-course/admin-course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngFor="let course of courses" 
      class="card mb-2 shadow-sm p-2 course-card" 
      (click)="selectCourse.emit(course)">
      <div><strong>{{ course.title }}</strong></div>
      <div class="text-muted small">{{ course.description }}</div>
    </div>
  `,
  styles: [`
    .course-card {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .course-card:hover {
      background-color: #f8f9fa;
    }
  `]
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Output() selectCourse = new EventEmitter<Course>();
}
