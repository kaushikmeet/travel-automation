import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toastr',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.css'
})
export class ToastrComponent implements OnInit {

    toasts: Toast[] = [];

    constructor(private toastSRV: ToastService){}

    ngOnInit(): void {
       this.toastSRV.toast$.subscribe((toast) => {
        this.toasts.push(toast);

        setTimeout(() => {
          this.remove(toast.id);
        }, 2500);
      });
    }

    remove(id: number){
      this.toasts = this.toasts.filter(t=> t.id !== id);
    }

    getClass(type: string) {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'error': return 'bg-red-600';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-600';
      default: return 'bg-gray-800';
    }
  }
}
