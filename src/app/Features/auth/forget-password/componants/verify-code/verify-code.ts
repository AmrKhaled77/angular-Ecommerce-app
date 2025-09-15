import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordServices } from '../../../../../core/services/auth/forget-password';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code.html',
  styleUrls: ['./verify-code.scss']
})
export class VerifyCode {
  isLoading = false;
  
  verifyForm!: FormGroup;   
  constructor(
    private fb: FormBuilder,
    private forgetPasswordServices: ForgetPasswordServices,
    private router: Router,
    
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}


  email!:string;
  
 ngOnInit(): void {
     this.verifyForm = this.fb.group({
    code: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required, ]
    })
  });
  this.route.queryParams.subscribe(params => {
   this.email = params['email'];
  console.log('Email from query:', this.email);
});

 }


  verifyCode() {
   

    this.isLoading = true;
    const code = this.verifyForm.get('code')?.value;

    this.forgetPasswordServices.verifyResetCode(code.trim() ).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Code verified successfully ✅');
         const email = this.email
        this.router.navigate(['/reset-password'], { queryParams: { email } });
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Invalid or expired code ❌');
        console.error(err);
      }
    });
  }
}
