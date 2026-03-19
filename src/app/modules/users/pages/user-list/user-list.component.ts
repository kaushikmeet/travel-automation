import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule, 
    RouterLink, 
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users:any[]=[];


  constructor(
    private userService: UserService,
  ){}

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe(res=>{
      this.users = res;
    })
  }

   delete(id:string){
    if(confirm("Are you sure delete User")){
      this.userService.deleteUser(id).subscribe(()=>{
        this.loadUsers()
      });
    }
  }
}
