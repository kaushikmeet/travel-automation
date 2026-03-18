import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-create',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
   
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  userForm!: FormGroup;

  constructor(
    private userSRV: UserService,
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required],
      role:['user']
    })
  }
  submit(){
    this.userSRV.createUser(this.userForm.value)
    .subscribe(()=>{
      this.router.navigate(['/users']);
    })
  }
}
