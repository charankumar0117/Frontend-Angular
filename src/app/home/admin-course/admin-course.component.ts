import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from "../../cards/cards.component";
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from "@angular/router";
import { Course } from './admin-course.model';
import { CourseListComponent } from '../../components/course-list/course-list.component';
import { CourseDetailComponent } from '../../components/course-detail/course-detail.component';
import { AddAssignmentComponent } from '../../components/add-assignment/add-assignment.component';
import { AddCourseComponent } from '../../components/add-course/add-course.component';
import { ToastService } from '../../toast.service';



interface Data {
  contentUrl: string;
  courseId: number;
  description: string;
  title: string;
}
@Component({
  selector: 'app-admin-course',
  imports: [CommonModule, CardsComponent, FormsModule, RouterOutlet, CourseListComponent, CourseDetailComponent, AddAssignmentComponent, AddCourseComponent],
  templateUrl: './admin-course.component.html',
  styleUrl: './admin-course.component.css'
})
export class AdminCourseComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  showAddCourse = false;
  showAddAssignment = false;
 
 
  constructor(private http: HttpClient, private toastService: ToastService) {}
 
  ngOnInit() {
    this.fetchCourses();
  }
 
  fetchCourses() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
 
    this.http.get<Course[]>(`/courses/instructor/${localStorage.getItem("id")}`, { headers }).subscribe({
      next: (data) => (this.courses = data),
      error: (err) => console.error('Error loading courses', err),
    });
  }
 
  onCourseSelected(course: Course) {
    this.selectedCourse = course;
    this.showAddCourse = false;
    this.showAddAssignment = false;
  }
 
  onCourseAdded(newCourse: Course) {
    console.log(newCourse);
    var a={
       
      title:newCourse.title,
      contentUrl: newCourse.contentUrl,
      description : newCourse.description
    } ;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    this.http.post(`courses/add/${localStorage.getItem("id")}`, a , { headers }).subscribe({
      next: (data) =>{
        //window.alert("course deleted successfull")
        console.log(data)
        this.fetchCourses();
       
      } ,
      error: (err) => console.error('Error while deleting', err),
    });
    this.showAddCourse = false;
     
  }
 
  onCourseDeleted(deletedCourseId: number) {
    

    console.log(deletedCourseId)
    //this.courses = this.courses.filter(c => c.courseId !== deletedCourseId);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    
    this.http.delete(`courses/${deletedCourseId}`, { headers }).subscribe({
      next: () =>{
        this.toastService.showSuccess('Course Deleted', 'Course has been successfully deleted.');
        this.fetchCourses();
       
      } ,
      error: (err) => {
        console.error('Error while deleting', err);
        this.toastService.showError('Deletion Failed', 'Failed to delete the course. Please try again.');
      },
    });
     
    this.selectedCourse = null;
  }
 
  cancelAddCourse() {
    this.showAddCourse = false;
  }
 
  onAddAssignmentClicked(courseId: number) {
    this.showAddAssignment = true;
    console.log('Add assignment clicked');
  }
}