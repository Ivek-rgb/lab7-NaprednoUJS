import { Injectable } from '@angular/core';
import { User } from '../model/user/user';
import { DataService } from '../forum-data/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authRoute : string = 'auth';

  constructor(private dataService : DataService, private router : Router) { }

  whoami(){
    if(!this.isLoggedIn()) return;
    this.dataService.postObject('me', { messsage: "Auth check"}).subscribe(
      {
        next: (val) => {
          return;
        },
        error: (error : HttpErrorResponse) => {
          this.logout();
        }
      }
    );
  }

  loginUser(username : string, password : string, onNextCallback ?: (a : {user : User, token : string}) => void, onErrorCallback ?: (error : HttpErrorResponse) => void) : void{
    this.dataService.postObject(this.authRoute + '/login', {username : username, password : password}).subscribe(
      {
        next: (val : {user : User, token : string}) => {
          this.loginAndSave(val.user, val.token);
          onNextCallback?.(val);
        },
        error: (error : HttpErrorResponse) => {
          onErrorCallback?.(error);
        }
      }
    );
  }

  registerUser(user : User){
    return this.dataService.postObject(this.authRoute + '/register', user);
  }

  private loginAndSave(userObj : User, token : string){
    if(sessionStorage.getItem('username')) return;
    sessionStorage.setItem('username', userObj.username);
    sessionStorage.setItem('email', userObj.email);
    sessionStorage.setItem('name', userObj.name);
    sessionStorage.setItem('token', token);
  }

  isLoggedIn(){
    if(typeof sessionStorage == 'undefined' || !sessionStorage || !sessionStorage.getItem('username'))
      return false;
    return true;
  }

  logout() : void{
    if(!this.isLoggedIn()) return;
    sessionStorage.clear();
    this.router.navigate(['auth']);
  }

  getToken() : string | null {
    return sessionStorage.getItem('token');
  }

  getUsername() : string | null {
    return sessionStorage.getItem('username');
  }

  getEmail() : string | null {
    return sessionStorage.getItem('email');
  }

  getFullName() : string | null {
    return sessionStorage.getItem('name');
  }

}
