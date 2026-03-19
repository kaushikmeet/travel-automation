import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<Toast>();
  toast$ = this.toastSubject.asObservable();

  private id = 0;

  show(type: Toast['type'], message: string) {
    this.toastSubject.next({
      id: ++this.id,
      type,
      message
    });
  }

  success(msg: string) {
    this.show('success', msg);
  }

  error(msg: string) {
    this.show('error', msg);
  }

  warning(msg: string) {
    this.show('warning', msg);
  }

  info(msg: string) {
    this.show('info', msg);
  }
}