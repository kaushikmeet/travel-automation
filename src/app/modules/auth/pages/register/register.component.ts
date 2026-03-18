import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false
  error = ''
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(){
  this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
}

  submit(){
    if(this.form.invalid) return;
    this.loading = true;
    this.auth.register(this.form.value).subscribe({
      next:()=>{
        alert("Account created successfully");
        this.router.navigate(['/auth/login'])
      },
      error:(err)=>{
        this.error = err.error?.message || "Registration Failed";
        this.loading = false;
      }
    })
  }
}
