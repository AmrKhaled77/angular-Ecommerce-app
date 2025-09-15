import { Component, inject, OnInit, signal } from '@angular/core';
import { WishListServices } from './services/wish-list-services';
import { WishListProduct } from './models/wish-list-product';
import { ProductItem } from '../../shared/componants/product-item/product-item';

@Component({
  selector: 'app-wish-list',
  imports: [ProductItem],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.scss'
})
export class WishList implements OnInit {

  private wishListServices = inject(WishListServices);


  wishListProducts = signal<WishListProduct[]>([]);
  loadingWishlist = signal<boolean>(false); 

  ngOnInit(): void {
    this.getWishlist();


   
  }

  getWishlist() {
    this.loadingWishlist.set(true);

    this.wishListServices.getAllWishList().subscribe({
      next: (res) => {
        this.loadingWishlist.set(false); 
       this.wishListServices.WishListIDS.next(res.data)
        this.wishListProducts.set(res.data );
        
                
      },
      error: (err) => {
        console.error(err);
        this.loadingWishlist.set(false); 
      },
    });
  }




}
