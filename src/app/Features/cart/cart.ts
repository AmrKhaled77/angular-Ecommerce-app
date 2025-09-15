import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartServices } from './services/cart-services';
import { CartResponse } from './interfaces/cart-data';
import e from 'express';
import { UiCartItem } from "./componants/ui-cart-item/ui-cart-item";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [UiCartItem,RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {

  constructor(private toastr: ToastrService) {
    
  }

cartResponse = signal<CartResponse | null>(null);
loadingCart = signal<boolean>(false);

isLoading=signal<boolean>(false);
   private cartServices =inject(CartServices)
  ngOnInit(): void {
   

   this.showCart()
  }


  showCart(reload:boolean=true){
 if(reload){
    this.loadingCart.set(true)
 }
     this.cartServices.getCart().subscribe({

next:(res)=>{

  this.loadingCart.set(false)

  this.cartResponse.set(res);


},


error:(err)=>{
    this.loadingCart.set(false)
}

    })
  }



  OnRemoveClick(productId:string){


this.cartServices.deletFromCart(productId).subscribe({


  next:(res)=>{

    console.log(res)

this.showCart()


},


error:(err)=>{
    console.log(err)
}

    })

}



onClearCart(){
 this.isLoading.set(true);  
  this.cartServices.clearCart().subscribe({




    next:(res)=>{
     
      this.toastr.success('Your cart has been cleared!')
      this.showCart()
         this.isLoading.set(false);  
    },

    error:(err)=>{
      this.isLoading.set(false);  
    }
  })
}


isUpdateLoding=signal<boolean>(false)
UpdateNum=signal<number>;


onUpdateClick(productId:string,count:number){

  if(count===0){
    this.OnRemoveClick(productId)
  }
    //  this.UpdateNum.set(count)
  this.isUpdateLoding.set(true)


  this.cartServices.UpdateInCart(productId,count).subscribe({



  next:(res)=>{
     
     this.isUpdateLoding.set(false)
      this.showCart()
        
    },

    error:(err)=>{
         this.isUpdateLoding.set(false)
       
    }
  })

  }





}




