import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { generateErrMsg, probeForErrors } from '../../utils/ValidationTools';
import { AccountService } from '../account.service';
import { AuthService } from '../auth.service';
import { User } from '../../model/user/user';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  cachedAccount : string = "";
  errorMessage = "";


  constructor(private formBuilder: FormBuilder, private router: Router, private authService : AuthService){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  errorCheck(fieldName: string){
    return probeForErrors(fieldName, this.loginForm);
  }

  getErrorMessage(fieldName: string): string{
    return generateErrMsg(fieldName, this.loginForm);
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }else{
      this.authService.loginUser(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value, () => {
        this.router.navigate(['/']);
      },
      (error : HttpErrorResponse) => {
        switch(error.status){
          case 500:
            this.errorMessage = "Server error, hold on!";
            break;
          case 401:
            this.errorMessage = "Account has not been found!";
            break;
        }
      });
    }
  }

  onRedirectRegister(){
    this.router.navigate(['/auth/register']);
  }

}
