import { Component } from '@angular/core';


import { AbstractFormGroupDirective, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {



registerForm: FormGroup = new FormGroup(
  {
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),

    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
    ]),

    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
    ]),

    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(01)[0125][0-9]{8}$/),
    ]),
  },
  
 
{
   validators : this.PasswordMatch,   
    updateOn: 'change'                
  }
)




  registerClick(){

    console.log(this.registerForm)


    console.log("alooooo",this.registerForm.invalid)
    console.log("alooooo",this.registerForm.errors?.['passwordNotMatch'])
  }



  PasswordMatch(form:any){


    if(form.get("password").value===form.get("rePassword").value){

      return null
    }
    else{
      return {passwordNotMatch:true}
    }
  }

}
