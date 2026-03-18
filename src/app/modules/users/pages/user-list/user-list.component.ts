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

  // applyFilter(event:Event){
  //   const value = (event.target as HTMLInputElement).value
  //   this.dataSource.filter = value.trim().toLowerCase();
  // }

   delete(id:string){
    // const dialogRef = this.dialog.open(ConfirmDialogComponent,{
    //   data:{message: 'Delete this user?'}
    // });
    if(confirm("Are you sure delete User")){
      this.userService.deleteUser(id).subscribe(()=>{
        this.loadUsers()
      });
    }

    // dialogRef.afterClosed().subscribe(res=>{
    //   if(confirm("Delete user?")){
    //     this.userService.deleteUser(id).subscribe(()=>{
    //     this.loadUsers()
    //    })
    //   }
    // })
  }
}
