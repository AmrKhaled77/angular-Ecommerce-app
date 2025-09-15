import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdressesServices } from './services/adresses-services';
import { CommonModule } from '@angular/common';
import { MakeOrder } from '../../core/services/makeOrder/make-order';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addresses.html',
  styleUrl: './addresses.scss'
})
export class Addresses implements OnInit {
  private fb = inject(FormBuilder);
  private adressesServices = inject(AdressesServices);
  private makeOrder = inject(MakeOrder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
      private toastrService=inject(ToastrService)

  // Signals for state management
  addresses = signal<any[]>([]);
  selectedAddressId = signal<string | null>(null);
  paymentMethod = signal<'cash' | 'visa' | null>(null);
  isLoading = signal<boolean>(false);
  isMakeOrderLoading = signal<boolean>(false);
  isAdding = signal<boolean>(false);
  showForm = signal<boolean>(false);
   cartId: string | null = null;

  // Reactive form for new address
  addressForm = this.fb.group({
    name: ['', Validators.required],
    details: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], 
    city: ['', Validators.required],
  });

  ngOnInit(): void {
      this.cartId = this.route.snapshot.paramMap.get('id');
    this.loadAddresses();
  }

 
  loadAddresses() {
    this.isLoading.set(true);
    this.adressesServices.GetAllAddresses().subscribe({
      next: (res) => {
        this.addresses.set(res.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
        this.isLoading.set(false);
      }
    });
  }

  selectAddress(id: string) {
    this.selectedAddressId.set(id);
  }


  addNewAddress() {
    if (this.addressForm.invalid) return;

    this.isAdding.set(true);
    this.adressesServices.addAddress(this.addressForm.value).subscribe({
      next: () => {
        this.addressForm.reset();
        this.isAdding.set(false);
        this.loadAddresses();
        this.showForm.set(false);
      },
      error: (err) => {
        console.error('Error adding address:', err);
        this.isAdding.set(false);
      }
    });
  }


  removeAddress(id: string, event: Event) {
    event.stopPropagation(); 
    if (confirm("Are you sure you want to delete this address?")) {
      this.isLoading.set(true);
      this.adressesServices.RemoveAddress(id).subscribe({
        next: () => {
          this.loadAddresses(); 
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error("Delete failed", err);
          this.isLoading.set(false);
        }
      });
    }
  }

  selectPayment(method: 'cash' | 'visa') {
    this.paymentMethod.set(method);
  }


  confirmOrder() {
    if (!this.selectedAddressId() || !this.paymentMethod()) {
      alert('Please select an address and a payment method');
      return;
    }

  const selected = this.addresses().find(a => a._id === this.selectedAddressId());
  if (!selected) {
    alert('Invalid address selected');
    return;
  }


  const shippingData = {
    shippingAddress: {
      details: selected.details,
      phone: selected.phone,
      city: selected.city
    }
  };

  if (this.paymentMethod() === 'cash') {
    this.isMakeOrderLoading.set(true)
    this.makeOrder.makeCashOrder(this.cartId!, shippingData).subscribe({
      next: (res) => {
            this.isMakeOrderLoading.set(false)
        console.log('Order placed successfully:', res);

   this.toastrService.success(
        'Your cash order has been placed successfully!',
        'Order Confirmed ✅'
      );
        
        this.router.navigate(['/allorders'])
        
      },
      error: (err) => {
          this.isMakeOrderLoading.set(false)
        console.error('Order failed:', err);
        alert('❌ Failed to place order, try again.');
      }
    });
  }
else  if (this.paymentMethod() === 'visa'){

   this.isMakeOrderLoading.set(true)
    this.makeOrder.CheckOutSession(this.cartId!, shippingData).subscribe({
      next: (res) => {
            this.isMakeOrderLoading.set(false)
         window.location.href = res.session.url; 
       
      },
      error: (err) => {
          this.isMakeOrderLoading.set(false)
        console.error('Order failed:', err);
        alert('❌ Failed to place order, try again.');
      }
    });

}
   
  }
}
