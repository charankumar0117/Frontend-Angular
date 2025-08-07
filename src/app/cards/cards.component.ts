import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../toast.service';

interface Data {
  contentUrl: string;
  courseId: number;
  description:  string;
  title: string;
  enrolled?: number; // Optional property for enrolled count
}
@Component({
  selector: 'app-cards',
  imports: [RouterLink,HttpClientModule],
  templateUrl: './cards.component.html',
  styleUrls:['./cards.component.css']
})
export class CardsComponent {

  @Input() courseData!:Data;
  path=window.location.pathname
  role=localStorage.getItem("role")
  
  // Helper method to generate random enrollment count
  getEnrollmentCount(): number {
    return this.courseData.enrolled || Math.floor(Math.random() * 50) + 25;
  }
  
  constructor(private http:HttpClient,private router:Router, private toastService: ToastService){}
  enroll(id:number){
    console.log("enroll is clicked")
    console.log(this.path)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    console.log(localStorage.getItem('id'));

    this.http
      .post(`/student/enrollments/enroll/${localStorage.getItem("id")}/${id}`,{}, { headers }) // <-- add headers here
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toastService.showSuccess('Enrollment Successful', 'You have been successfully enrolled in this course!');
         //this.listOfCourses=data;
        },
        error: (err) => {
          console.error(err.error.message);
          const errorMessage = err.error?.message || 'Failed to enroll in the course. Please try again.';
          this.toastService.showError('Enrollment Failed', errorMessage);
          
        },
      });
  }
  assessmentDetails( id:number){
    console.log(id)
    this.router.navigate(["/home/courseByAdmin/assign/",id])


  }

  

}
