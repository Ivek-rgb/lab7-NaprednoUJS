import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'crud-forum';

  constructor(private router : Router, private authService : AuthService){}

  ngOnInit(): void {
    this.authService.whoami();
  }

}
