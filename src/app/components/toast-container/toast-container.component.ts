import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        class="toast show"
        [class]="'toast-' + toast.type"
        role="alert"
      >
        <div class="toast-header">
          <i [class]="getIconClass(toast.type)"></i>
          <strong class="me-auto">{{ toast.title }}</strong>
          <button 
            type="button" 
            class="btn-close" 
            (click)="removeToast(toast.id)"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">
          {{ toast.message }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeToast(id: string) {
    this.toastService.removeToast(id);
  }

  getIconClass(type: string): string {
    const icons = {
      'success': 'fas fa-check-circle text-success',
      'error': 'fas fa-exclamation-circle text-danger',
      'warning': 'fas fa-exclamation-triangle text-warning',
      'info': 'fas fa-info-circle text-info'
    };
    return icons[type as keyof typeof icons] || icons.info;
  }
} 