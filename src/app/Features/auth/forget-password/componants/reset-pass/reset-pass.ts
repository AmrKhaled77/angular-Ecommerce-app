import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordServices } from '../../../../../core/services/auth/forget-password';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-pass.html',
  styleUrl: './reset-pass.scss'
})
export class ResetPass {

  isLoading = signal<boolean>(false);
  resetPasswordErrormessage = signal<string>('');

  forgetPasswordServices=inject(ForgetPasswordServices)
    private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  email!: string;

 ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
   this.email = params['email'];

});
  }
  
resetPasswordForm: FormGroup = new FormGroup(
  {

      password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
    ]),

    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
    ]),
  },
  {
   validators : this.PasswordMatch,   
    updateOn: 'change'                
  }
)


  PasswordMatch(form:any){


    if(form.get("password").value===form.get("rePassword").value){

      return null
    }
    else{
      return {passwordNotMatch:true}
    }
  }


  resetPasswordClick(){
  

    this.isLoading.set(true);

    const password = this.resetPasswordForm.get('password')?.value;

    this.forgetPasswordServices.resetPassword(this.email, password!).subscribe({
      next: () => {
        this.isLoading.set(false);

        this.toastr.success('Password reset successfully ✅');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.resetPasswordErrormessage.set('Failed to reset password ❌');
        console.error(err);
      }
    });
  }
  }


