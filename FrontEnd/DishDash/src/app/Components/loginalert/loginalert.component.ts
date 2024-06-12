import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loginalert',
  templateUrl: './loginalert.component.html',
  styleUrl: './loginalert.component.css'
})
export class LoginalertComponent {
  constructor(private dialog:MatDialog, public dialogRef:MatDialogRef<LoginalertComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }

  openLoginDialog(){
    this.closeDialog();
    this.dialog.open(LoginComponent);
  }

}
