import { register } from 'module';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fieldsMatchValidate, generateErrMsg, probeForErrors } from '../../utils/ValidationTools';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm : FormGroup;

  currStatus = 1
  statusEnum : Record<number, string> = {
    0 : "Account created! Please return back to login page!",
    1 : "",
    2 : "Account with that name already exists!",
    3 : "Server eror while creating account! Please try again later!"
  };

  public successStyle = "background-color:lightgreen;color:green;opacity:0.8;";
  public errorStyle = "background-color:lightcoral;color:darkred;opacity:0.8;";

  constructor(private formBuilder: FormBuilder, private authService : AuthService){
       this.registerForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(4)]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          passwordag: ['', [Validators.required]],
          name: ['', [Validators.required, Validators.minLength(4)]],
          email: ['', [Validators.required, Validators.email]]
        },
        {
          validators: fieldsMatchValidate('passwordag', 'password'),
        });
  }

  errorCheck(fieldName: string){
    return probeForErrors(fieldName, this.registerForm);
  }

  getErrorMessage(fieldName: string): string{
    return generateErrMsg(fieldName, this.registerForm);
  }

  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }else{
      const {passwordag, ...user} = this.registerForm.value;
      this.authService.registerUser(user).subscribe( {next: (acc) => {
        this.registerForm.reset();
        this.currStatus = 0;
      }, error: (error: HttpErrorResponse) => {
        switch (error.status){ // TODO: remove patch, make errors and status enum homogenous
            case 403:
              this.currStatus = 2;
              break;
            case 500:
              this.currStatus = 3;
              break;
        }
      }});

    }
  }

}
