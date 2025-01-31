import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent{

  username : string;
  email : string;

  constructor(private authService : AuthService){
    this.username = authService.getUsername()!;
    this.email = authService.getEmail()!;
  }

  logUserOut(){
    this.authService.logout();
  }

}
