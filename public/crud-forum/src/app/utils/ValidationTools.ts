import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fieldsMatchValidate(
  controlName: string,
  matchingControlName: string
) : ValidatorFn{
  return (formGroup: AbstractControl): ValidationErrors | null => {

    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if(!control && !matchingControl){
      return null;
    }

    if (!control || !matchingControl) {
      control?.setErrors({ fieldsMismatch: {
        firstField: controlName, secondField: matchingControlName
      }});
      return { fieldsMismatch: {
        firstField: controlName, secondField: matchingControlName
      }};
    }

    if (control.value !== matchingControl.value) {
      control?.setErrors({ fieldsMismatch: {
        firstField: controlName, secondField: matchingControlName
      }});
      return { fieldsMismatch: {
        firstField: controlName, secondField: matchingControlName
      }};
    }

    formGroup.setErrors(null);
    return null;

  }
}

export function probeForErrors(fieldName : string, form : FormGroup){
  const control =  form.get(fieldName);
  return control?.touched && control?.invalid;
}

export function generateErrMsg(fieldName : string, form : FormGroup ){
  const control = form.get(fieldName);
  if(control?.hasError('required')){
    return '*This field is required';
  }
  if(control?.hasError('minlength')){
    const requiredLength = control.getError('minlength')?.requiredLength;
    return `*This field needs to be ${requiredLength} characters.`
  }
  if(control?.hasError('email')){
    return '*Please enter a valid email address';
  }
  if(control?.hasError('fieldsMismatch')){
    const mismatchedField = control.getError('fieldsMismatch')?.secondField;
    return `*This field does not match with field named ${mismatchedField}`;
  }
  return "";
}
