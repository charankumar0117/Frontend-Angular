import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  @Input() courseId!: number;
  assignments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAssignments();
  }

  fetchAssignments() {
    if (!this.courseId) return;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    this.http.get<any[]>(`/api/assessments/by-course/${this.courseId}`,{headers})
      .subscribe({
        next:(data)=>{
          console.log(data)
          this.assignments=data
        }
      })
  }
}
