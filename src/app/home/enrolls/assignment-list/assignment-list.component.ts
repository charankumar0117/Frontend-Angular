import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Assignment } from '../../../course.model';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './assignment-list.component.html',
})
export class AssignmentListComponent implements OnChanges {
  @Input() courseId!: number;

  assignments: Assignment[] = [];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId) {
      this.fetchAssignments();
    }
  }

  fetchAssignments() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`, // You can externalize this token later
    });

    this.http.get<Assignment[]>(`/api/assessments/by-course/${this.courseId}`, { headers })
      .subscribe({
        next: (data) => {
          this.assignments = data;
        },
        error: (err) => {
          console.error('Error fetching assignments:', err);
        }
      });
  }
  takeAsses(id:number){
    this.router.navigate(['/assesment',id])
  }
}
