import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';



@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;
  user: any;
  isLoggedIn = false;

  constructor(public auth: AuthService, private router: Router){}

  ngOnInit(){
    const u = localStorage.getItem("user");
    this.user = u? JSON.parse(u): null;

    this.auth.authState$.subscribe(state=>{
      this.isLoggedIn = state;
    })
  }

   logout(){
    localStorage.clear();
    this.auth.logout();

    this.router.navigate(['/auth/login']);
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

}
