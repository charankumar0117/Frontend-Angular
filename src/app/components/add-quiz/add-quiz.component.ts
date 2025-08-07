import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../toast.service';


interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent {
  @Output() quizSubmit = new EventEmitter<QuizQuestion[]>();
  
  currentQuestion: QuizQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  };

  questions: QuizQuestion[] = [];

  constructor(private toastService: ToastService) {}

  addQuestion() {
    if (
      !this.currentQuestion.question.trim() ||
      this.currentQuestion.options.some(opt => !opt.trim()) ||
      !this.currentQuestion.correctAnswer.trim()
    ) {
      this.toastService.showWarning('Incomplete Question', 'Please fill in all fields before adding the question.');
      return;
    }

    if (this.questions.length >= 10) {
      this.toastService.showWarning('Question Limit', 'Maximum 10 questions allowed per quiz.');
      return;
    }

    this.questions.push({ ...this.currentQuestion });
    this.toastService.showSuccess('Question Added', `Question ${this.questions.length} added successfully!`);
    this.currentQuestion = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    };
  }

  submitQuiz() {
    if (this.questions.length === 0) {
      this.toastService.showWarning('No Questions', 'Please add at least one question before submitting.');
      return;
    }

    console.log('Quiz submitted:', this.questions);
    this.toastService.showSuccess('Quiz Submitted', 'Quiz submitted successfully!');
    this.quizSubmit.emit(this.questions); // Notify parent
  }
}
