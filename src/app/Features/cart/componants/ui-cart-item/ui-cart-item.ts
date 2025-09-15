import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { CartItem } from '../../interfaces/cart-data';
import { CartServices } from '../../services/cart-services';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ui-cart-item',
  imports: [RouterLink],
  templateUrl: './ui-cart-item.html',
  styleUrl: './ui-cart-item.scss'
  
})
export class UiCartItem implements OnInit {

  @Input({required:true}) cartItem!:CartItem;

@Input() refreshCart!: () => void;

    constructor(private toastr: ToastrService) {
      
    }


   
private cartServices =inject(CartServices)

isUpdateLoading=signal<boolean>(false);

UpdateCount=signal<number>(0);



 ngOnInit(): void {
      this.UpdateCount.set(this.cartItem.count)
    }




isDeleteLoading=signal<boolean>(false);
isDeleted=signal<boolean>(false);
OnRemoveClick(productId: string) {
  this.isDeleteLoading.set(true);

  this.cartServices.deletFromCart(productId).subscribe({
    next: (res) => {
      console.log(res);

      // Wait for fade-out animation before refreshing cart
      setTimeout(() => {
        this.refreshCart();
        this.isDeleteLoading.set(false);
      }, 300); // 👈 match your CSS animation duration
    },

    error: (err) => {
      console.log(err);
      this.isDeleteLoading.set(false);
    }
  });
}





  onUpdateClick(productId:string,count:number){

    if(count===0){
      this.OnRemoveClick(productId)
    }

    this.UpdateCount.set(count)
    this.isUpdateLoading.set(true);

    
    


  this.cartServices.UpdateInCart(productId,count).subscribe({



  next:(res)=>{

    this.isUpdateLoading.set(false);
     
    this.refreshCart()
        
    },

    error:(err)=>{

        this.isUpdateLoading.set(false);
       
       
    }
  })

  }

}
