import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any= {
    email: '',
    password:''
  };

  constructor(
    private auth: AuthService, 
    private router: Router,
    private toastr: ToastService
  ){}


// login logic
login() {
  if (!this.form.email || !this.form.password) {
    this.toastr.error("Please fill in all fields");
    return;
  }

  this.auth.login(this.form).subscribe({
    next: (res: any) => {
      // 1. Save the token and user data to signals/localStorage
      this.auth.saveAuth(res);
      const user = res.data?.user || res.user;
      const role = user?.role;
      if (user.role === 'admin') {
        this.router.navigate(['/dashboard']); 
      } else if (user.role === 'agent') {
        this.router.navigate(['/bookings']); 
      } else {
        this.router.navigate(['/dashboard']); 
      }

      this.toastr.success(`Welcome back, ${user?.name}`);
      
    },
    error: (err) => {
      this.toastr.error(err.error?.message || "Login failed");
    }
  });
}


  
}
