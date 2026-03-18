import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any= {};

  constructor(private auth: AuthService, private router: Router){}

  login(){
    this.auth.login(this.form).subscribe((res:any)=>{
      localStorage.clear();
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      // this.auth.saveAuth(res);
      this.router.navigate(['/dashboard']);
    })
  }
  

}
