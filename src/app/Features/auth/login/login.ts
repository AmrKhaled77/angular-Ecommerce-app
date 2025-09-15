import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {




    constructor(private auth:Auth){

  }
private router:Router =inject(Router);
  

  
  isLoding=signal<boolean>(false);


  registerErrorMassge=signal<string>('');


loginForm: FormGroup = new FormGroup(
  {
   

    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
    ]),

   
  },
  
 
{
            
  }
)





  LoginClick(){

    
this.isLoding.set(true);
    if(this.loginForm.valid){

 this.auth.Login(this.loginForm.value).subscribe(
  {
    next:(res:any)=>{

this.isLoding.set(false);
localStorage.setItem('userdata',res.token)

this.auth.setUserData();

this.router.navigate(['/home'])
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


onForgetPasswordClick(){
  this.router.navigate(['/forgetpassword'])
}
 
}
