import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-edit',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
 id='';
 editForm!: FormGroup;

 constructor(
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private userSRV: UserService,
  private router: Router,
 ){}

 ngOnInit(){
  this.id= this.route.snapshot.params['id'];
  this.userSRV.getUser(this.id)
  .subscribe(res=>{
    this.editForm.patchValue(res);
  });

  this.editForm = this.fb.group({
    name:['', Validators.required],
    email:['',Validators.required],
    role: ['', Validators.required]
  });
 }

update(){
  this.userSRV.updateUser(this.id, this.editForm.value).subscribe(()=>{
    this.router.navigate(['/users']);
  })
 }

}
