import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../toast.service';


interface QuestionDB{
  options:string[],
  correctAnswer:string,
  questionText:string
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  constructor(private http:HttpClient,private route: ActivatedRoute,private router: Router, private toastService: ToastService){}
  assignmentId!: string;

  // Helper method for generating option labels
  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
  questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      correctAnswerIndex: 2,
    },

  ];
  ngOnInit(){

    this.assignmentId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.assignmentId);

    const headers = new HttpHeaders({
          Authorization :`Bearer ${localStorage.getItem("token")}`
        });
        this.http.get<QuestionDB[]>(`api/assessments/questions/${this.assignmentId}`, { headers } )
        .subscribe({
          next:(data) =>{
            console.log(data);
            data.forEach((d)=>{
              this.questions.push({
                question:  d.questionText,
                options: d.options,
                correctAnswerIndex: d.options.indexOf(d.correctAnswer),
              })
              console.log(d.questionText)
            })
          },
          error:(error)=>{
            console.log(error)
          }
    
        })
     
     
    
  }
  // Array of questions with options and correct answer index
   

  currentQuestionIndex = 0;
  score = 0;
  selectedOption: number | null = null;
  isAnswered = false;

  // Method to check if the answer is correct
  checkAnswer(optionIndex: number) {
    if (this.isAnswered) return; // Prevent changing after answering

    this.selectedOption = optionIndex;
    const isCorrect = optionIndex === this.questions[this.currentQuestionIndex].correctAnswerIndex;
    if (isCorrect && this.score < this.questions.length) {
      this.score++;
    }
    this.isAnswered = true;
  }

  // Move to the next question
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.selectedOption = null;
    }
  }

  // Submit the quiz
  submitQuiz() {
    this.currentQuestionIndex = 0;
     
    this.isAnswered = false;
    this.selectedOption = null;
    
    const headers = new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem("token")}`
    });
    // Ensure percentage never exceeds 100 and handle division by zero
    var per = this.questions.length > 0 ? Math.min(100, Math.round((this.score / this.questions.length) * 100)) : 0;
    this.toastService.showSuccess('Assessment Completed', `Quiz finished! Your score: ${per}%. Submitting results...`);
    
    this.http.post(`api/submissions/submit/${localStorage.getItem("id")}/${this.assignmentId}/${per}`,{},{headers})
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.toastService.showSuccess('Results Submitted', 'Your assessment results have been submitted successfully!');
        this.router.navigate(['/home/submissions'])
      },
      error:(err)=>{
        console.error('Error submitting results', err);
        this.toastService.showError('Submission Failed', 'Failed to submit assessment results. Please try again.');
      }
    })
    
  }

  // Get current question
  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  get percentage(): number {
    // Ensure percentage never exceeds 100 and handle division by zero
    return this.questions.length > 0 ? Math.min(100, Math.round((this.score / this.questions.length) * 100)) : 0;
  }
  
}
