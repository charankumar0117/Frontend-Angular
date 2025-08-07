import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuizComponent } from "../add-quiz/add-quiz.component";
import { Course } from '../../home/admin-course/admin-course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, AddQuizComponent],
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent {
  @Input() course!: Course;
  @Output() deleteCourse = new EventEmitter<number>();
  @Output() addAssignmentClick = new EventEmitter<number>();

  delete() {
    this.deleteCourse.emit(this.course.courseId);
  }

  addAssignment() {
    this.addAssignmentClick.emit(this.course.courseId);
  }
}
