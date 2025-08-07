import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CardsComponent } from "../../cards/cards.component";
import { RouterOutlet } from "@angular/router";
import { Course } from '../../course.model';
import { forkJoin } from 'rxjs';
import { CourseDetailComponent } from "./course-details/course-details.component";
import { CourseListComponent } from "./course-list/course-list.component";
interface Enrolls{
  
  course:{

    courseId:number,
    title:string,
    description:string,
    contentUrl:string
  } ,
  enrollmentId:number,
  progress:number,

}
@Component({
  selector: 'app-enrolls',
  imports: [HttpClientModule, CardsComponent, RouterOutlet, HttpClientModule, CourseDetailComponent, CourseListComponent],
  templateUrl: './enrolls.component.html',
  styleUrl: './enrolls.component.css'
})
export class EnrollsComponent implements OnInit {

  selectedCourse: Course | null = null;
  courses?: Course[];
  enrolls?: Enrolls[];
   

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    const enrollments$ = this.http.get<Enrolls[]>(`/student/enrollments/by-student/${localStorage.getItem("id")}`, { headers });
    

    forkJoin([enrollments$]).subscribe({
      next: ([enrollsData]) => {
        this.enrolls = enrollsData;
        this.handleAfterHttpComplete();
      },
      error: (err) => {
        console.error("  Error in one of the requests:", err);
      }
    });
  }

  handleAfterHttpComplete() {
    console.log(this.enrolls)
    this.courses=[]

    this.enrolls?.forEach((data)=>{
        console.log(data)
        this.courses!.push({...(data.course),
          progress:data.progress,
          eid:data.enrollmentId
        })
    })

    console.log(this.courses)
  }
  

  onCourseSelected(course: Course) {
    this.selectedCourse = course;
  }
}
