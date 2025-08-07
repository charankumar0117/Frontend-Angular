import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, SlicePipe } from '@angular/common';
import { Course } from '../../../course.model';

interface Enrolls{
  course:Course ,
  enrollmentId:number,
  progress:number
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, NgFor, SlicePipe],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Output() selectCourse = new EventEmitter<Course>();

  // Expose Math for template usage
  Math = Math;

  onSelect(course: Course) {
    this.selectCourse.emit(course);
  }

  getCurrentDate(): string {
    return new Date().getFullYear().toString();
  }
}
