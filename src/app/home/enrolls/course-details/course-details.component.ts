import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { AssignmentListComponent } from '../assignment-list/assignment-list.component';
import { Course } from '../../../course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule,AssignmentListComponent],
  templateUrl: './course-details.component.html',
})
export class CourseDetailComponent {
  @Input() course: Course | null = null;

  // Expose Math for template usage
  Math = Math;

  constructor(private http:HttpClient){}
  
  onClickOfUrl(course:Course){
    // Calculate new progress (increase by 10, but don't exceed 100)
    const newProgress = Math.min(course.progress + 10, 100);
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`, // You can externalize this token later
    });

    this.http.put(`/student/enrollments/${course.eid}/progress/${newProgress}`,{},{headers})
    .subscribe({
      next:(data)=>{
        console.log(data);
        // Update the local course progress to reflect the change immediately
        if (this.course) {
          this.course.progress = newProgress;
        }
      },
      error:(error)=>{
        console.error('Error updating progress:', error);
      }
    })
  }
}
