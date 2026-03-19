import { Component, computed } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../../config/sidebar.config';
import { AuthService } from '../../../modules/auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

   menu: MenuItem[] = [];
   role: string = '';
   today: any;

   filteredMenu = computed(() => {
    const userRole = this.auth.user()?.role || 'user';
    return MENU_ITEMS.filter(item => item.roles.includes(userRole));
  });

  constructor(private route: Router, public auth: AuthService){}

  ngOnInit(){
    this.today = new Date();
    const user = this.auth.getUser();
    this.role = user?.role || 'user';
  }
  
}
