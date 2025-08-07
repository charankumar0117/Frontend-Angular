import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CardsComponent } from "../../cards/cards.component";

interface Data {
  contentUrl: string;
  courseId: number;
  description:  string;
  title: string;
}

@Component({
  selector: 'app-courses',
  imports: [HttpClientModule, CardsComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'], // corrected from styleUrl to styleUrls
})
export class CoursesComponent implements OnInit {

  
  constructor(private http: HttpClient) {}


  listOfCourses?:Data[];
  ngOnInit() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    console.log(localStorage.getItem('token'));

    this.http
      .get<Data[]>('/courses', { headers }) // <-- add headers here
      .subscribe({
        next: (data) => {
          console.log(data);
          this.listOfCourses=data;
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
        },
      });
  }
}
