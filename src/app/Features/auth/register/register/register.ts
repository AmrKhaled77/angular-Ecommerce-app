import { Component, inject, signal } from '@angular/core';


import { AbstractFormGroupDirective, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {


  constructor(private auth:Auth){

  }
private router:Router =inject(Router);
  

  
  isLoding=signal<boolean>(false);


  registerErrorMassge=signal<string>('');


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

    this.isLoding.set(true);

    if(this.registerForm.valid){

 this.auth.register(this.registerForm.value).subscribe(
  {
    next:(res)=>{

this.isLoding.set(false);

this.router.navigate(['/login'])
    },


    error:(err)=>{

      this.isLoding.set(false);
      console.log(err)
this.registerErrorMassge.set(err.error.message);

    },
  }
 )
    }


   
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
