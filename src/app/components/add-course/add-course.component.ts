import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Course } from '../../home/admin-course/admin-course.model';
 
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-course.component.html',
})
export class AddCourseComponent {
  @Output() courseAdded = new EventEmitter<Course>();
  @Output() cancelAdd = new EventEmitter<void>();

  newCourse: Course = {
    courseId: Date.now(),
    title: '',
    description: '',
    contentUrl: '',
    assignments: [],
  };

  addCourse(form: NgForm) {
    if (form.valid) {
      const courseToEmit: Course = {
        ...this.newCourse,
        courseId: Date.now(),
        assignments: [],
      };
      this.courseAdded.emit(courseToEmit);
      this.resetForm(form);
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newCourse = {
      courseId: Date.now(),
      title: '',
      description: '',
      contentUrl: '',
      assignments: [],
    };
  }

  cancel() {
    this.cancelAdd.emit();
  }
}
