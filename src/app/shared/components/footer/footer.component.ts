import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(public auth: AuthService){}

  
}
