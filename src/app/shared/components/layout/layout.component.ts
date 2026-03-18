import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthRoutingModule } from "../../../modules/auth/auth-routing.module";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../modules/auth/auth.service';
import { FooterComponent } from "../footer/footer.component";




@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    AuthRoutingModule,
    FooterComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(public auth: AuthService){}
}
