import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../../core/services/auth/auth';
import { log } from 'console';
import { CartServices } from '../../../../Features/cart/services/cart-services';
import { WishListServices } from '../../../../Features/wish-list/services/wish-list-services';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar implements OnInit {

   constructor(@Inject(PLATFORM_ID) private platformId: any) {}


   private cartServices =inject(CartServices)
   private wishListServices =inject(WishListServices)


   NavCartCount=signal<number>(0)
   NavWishListCount=signal<number>(0)


private router:Router =inject(Router);
 isOpen = false; //



   auth :Auth=inject(Auth);




  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }

   

  
  }

   isLogin=signal<boolean>(false);


  ngOnInit(): void {


    this.CheckLogin();

    if(this.isLogin()){
 this.cartServices.getCart().subscribe({
      next:(res)=>{
   this.NavCartCount.set(res.numOfCartItems); 
      }
    })

    this.wishListServices.loadWishList()
    }
   


    this.cartServices.cartCount.subscribe({
      next:(res)=>{

        this.NavCartCount.set(res)
      }
    })

    this.wishListServices.WishListCount.subscribe({
      next:(res)=>{
this.NavWishListCount.set(res)
        
      }
    })



    
    
    
  }
  
  


 


   
CheckLogin() {
  this.auth.userData.subscribe(user => {
    console.log('User from BehaviorSubject:', user);
    this.isLogin.set(!!user); 
  });
}








  logOut(){
    localStorage.removeItem('userdata');
    this.auth.userData.next(null)

     
    this.router.navigate(['/login'])

  }

}
