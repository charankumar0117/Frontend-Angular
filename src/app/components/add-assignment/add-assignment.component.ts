import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { AssignmentListComponent } from '../assignment-list/assignment-list.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../toast.service';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}
interface Options{
  optionText:string;
}
interface Questions{
  
    questionText: string,
    correctAnswer: string,
    options: Options[]
  
}
@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [HttpClientModule,CommonModule, FormsModule, AddQuizComponent, AssignmentListComponent],
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  constructor(private http:HttpClient, private toastService: ToastService){}
  @Input() courseId!: number;

  private _maxScore = 0;
  showQuizPopup = false;
  selectedType = 'quiz'; // Default selection

  // Getter and setter for maxScore to ensure proper validation
  get maxScore(): number {
    return this._maxScore;
  }

  set maxScore(value: number) {
    // Store the value as-is to allow proper validation
    this._maxScore = value || 0;
  }

  openQuizPopup() {
    if (!this.maxScore || this.maxScore <= 0) {
      this.toastService.showWarning('Invalid Input', 'Please enter a valid maximum score (1-100) before creating a quiz.');
      return;
    }
    if (this.maxScore > 100) {
      this.toastService.showWarning('Invalid Input', 'Maximum score cannot exceed 100.');
      return;
    }
    this.showQuizPopup = true;
    this.toastService.showInfo('Quiz Creator', 'Fill in the quiz details and submit to create your assignment.');
  }

  closeQuizPopup() {
    this.showQuizPopup = false;
  }

  submitAssignment() {
    const payload = {
      maxScore: this.maxScore,
      type: 'Assignment',
      courseId: this.courseId
    };

    console.log('Submitting:', payload);
    // send payload to backend
  }
  getQuiz(quizDetails :QuizQuestion[]){
    //console.log(quizDetails)

    let assignment:Questions[]=[] ;
    quizDetails.forEach((data)=>{
      let temp:Options[]=[];
      data.options.forEach((op)=>{
        temp.push({
          optionText:op
        })
      })
       
      
      assignment.push({
        questionText: data.question,
        correctAnswer: data.correctAnswer,
        options: temp
      })
      
    })
    console.log(assignment)


    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
 
    this.http.post(`api/assessments/add/${this.courseId}/${localStorage.getItem("id")}`,{
          maxScore: this.maxScore,
          questions:assignment


    }, { headers })
    .subscribe({
      next: (data) => {
        console.log(data);
        // Close popup after successful submission
        this.closeQuizPopup();
        // Reset form
        this.maxScore = 0;
        // Show success toast
        this.toastService.showSuccess('Quiz Created', 'Your quiz assignment has been successfully created and added to the course.');
      },
      error: (err) => {
        console.error('Error creating assignment', err);
        this.toastService.showError('Creation Failed', 'Failed to create the quiz assignment. Please try again.');
      },
    });

  }
}
