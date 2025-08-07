import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

interface Course {
  courseId: number;
  title: string;
  description: string;
  contentUrl: string;
}

interface Assessment {
  assessmentId: number;
  type: string;
  maxScore: number;
  course: Course;
}

interface Submission {
  submissionId: number;
  score: number;
  assessment: Assessment;
}

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  submissions: Submission[] = [
    
    
  ];
  constructor(private http:HttpClient){}
    
  ngOnInit(){
    const headers = new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem("token")}`
    });
    this.http.get<Submission[]>(`api/submissions/by-student/${localStorage.getItem("id")}`, { headers } )
    .subscribe({
      next:(data) =>{
        console.log(data);
        this.submissions=data
        
      },
      error:(error)=>{
        console.log(error)
      }

    })
  }
}
