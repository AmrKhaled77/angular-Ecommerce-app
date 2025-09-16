import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartServices } from './services/cart-services';
import { CartResponse } from './interfaces/cart-data';
import { UiCartItem } from "./componants/ui-cart-item/ui-cart-item";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [UiCartItem, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit {

  constructor(private toastr: ToastrService) {}

  cartResponse = signal<CartResponse | null>(null);
  loadingCart = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  private cartServices = inject(CartServices);

  ngOnInit(): void {
    this.showCart();
  }

  showCart(reload: boolean = true) {
    if (reload) this.loadingCart.set(true);

    this.cartServices.getCart().subscribe({
      next: (res) => {
        this.loadingCart.set(false);
        this.cartResponse.set(res);
      },
      error: () => {
        this.loadingCart.set(false);
      }
    });
  }

  onRemoveClick(productId: string) {
    this.cartServices.deletFromCart(productId).subscribe({
      next: () => this.showCart(),
      error: (err) => console.error(err)
    });
  }

  onClearCart() {
    this.isLoading.set(true);
    this.cartServices.clearCart().subscribe({
      next: () => {
        this.toastr.success('Your cart has been cleared!');
        this.showCart();
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  isUpdateLoading = signal<boolean>(false);
  updateNum = signal<number>(0);

 onUpdateClick(productId: string, count: number) {
  // if (count === 0) {
  //   this.onRemoveClick(productId);
  //   return;
  // }

  this.isUpdateLoading.set(true);

  this.cartServices.UpdateInCart(productId, count).subscribe({
    next: () => {
      this.isUpdateLoading.set(false);
      this.showCart();
    },
    error: () => this.isUpdateLoading.set(false)
  });
}

}
