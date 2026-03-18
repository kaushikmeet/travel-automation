import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Inject } from '@angular/core'


@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule,],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
// constructor(
//     private dialogRef:MatDialogRef<ConfirmDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data:any
//   ){}

  // close(res: boolean){
  //   this.dialogRef.close(res);
  // }
}
