import { Component, computed, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { ProdctsDatum } from '../../../Features/home/intrfaces/products-data';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartServices } from '../../../Features/cart/services/cart-services';
import { WishListServices } from '../../../Features/wish-list/services/wish-list-services';

import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink,DecimalPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem implements OnInit {

  @Input({required:true}) cardItem!: ProdctsDatum;

     @Output() wishlistChanged = new EventEmitter<void>();



   constructor(private toastr: ToastrService) {
   
   }

   private cartServices =inject(CartServices)

   isLoading = signal<boolean>(false);


   ngOnInit(): void {
  
this.wishListServices.WishListIDS.subscribe({

  
  next:(res)=>{

    for (let i = 0; i < this.wishListServices.WishListIDS.value.length; i++) {

  if (this.wishListServices.WishListIDS.value[i].id === this.cardItem.id) {

    this.isFAv.set(true);

  
  }
}
  }
})

   }




 
    


  onAddToCartClick(){
    

      this.isLoading.set(true);
 this.cartServices.addToCart(this.cardItem._id).subscribe({
  next:(res)=>{

console.log(res)
    this.toastr.success(res.message);

   
      this.isLoading.set(false);





  },



  error:(err)=>{
    console.log(err)
      this.isLoading.set(false);
  }
 })

  }


 

     wishListServices=inject(WishListServices)

     

     
    
  isFAv = signal<boolean>(false);




onWishlistClick(productId: string) {

  
  this.isFAv.update(v => !v);


  if(this.isFAv()){

 this.wishListServices.addToWishList(productId).subscribe({
    next:(res)=>{


 this.wishListServices.loadWishList();
    

    }
    ,
    error:(err)=>{
       console.log("error from wishlist :::"+err)

       this.isFAv.update(v => !v);
    }
  })
  }
  else{


    



      this.wishListServices.removeFromWishList(productId).subscribe({

    next:(res)=>{

      
 


  
 this.wishlistChanged.emit();

   this.wishListServices.loadWishList();


    

   
    }
    ,
    error:(err)=>{
  
        this.isFAv.update(v => !v);

      console.log("error from wishlist :::"+err)
    }
  })
  }

  
 




}

}
