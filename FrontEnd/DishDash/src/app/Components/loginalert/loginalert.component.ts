import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-loginalert',
  templateUrl: './loginalert.component.html',
  styleUrl: './loginalert.component.css'
})
export class LoginalertComponent {
  constructor(private dialog:Dialog){}

  openLoginDialog(){
    this.dialog.open(LoginComponent);
  }

}
