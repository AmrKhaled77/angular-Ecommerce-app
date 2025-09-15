import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordServices } from '../../../core/services/auth/forget-password';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forget-password.html',
  styleUrls: ['./forget-password.scss']
})
export class ForgetPasswordComponent implements OnInit {
  isLoading = false;   // ✅ هنا هنتحكم بالتحميل
  forgotForm!: FormGroup;   

  constructor(
    private fb: FormBuilder,
    private forgetPasswordServices: ForgetPasswordServices,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgetPassword() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;   // ✅ بدأ التحميل

    const email = this.forgotForm.get('email')?.value;

    this.forgetPasswordServices.forgetPassword(email).subscribe({
      next: (res) => {
        this.isLoading = false;   // ✅ وقف التحميل
        this.toastr.success('Code sent to your email');
        this.router.navigate(['/verify-code'], { queryParams: { email } });
      },
      error: (err) => {
        this.isLoading = false;   // ✅ وقف التحميل برضو لو حصل خطأ
        this.toastr.error('Something went wrong, please try again');
        console.error(err);
      },
    });
  }
}
