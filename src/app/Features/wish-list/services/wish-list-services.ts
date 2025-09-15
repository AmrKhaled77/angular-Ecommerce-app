import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductItem } from '../../../shared/componants/product-item/product-item';
import { ProdctsDatum } from '../../home/intrfaces/products-data';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class WishListServices {


  hHttpClient=inject(HttpClient);
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


 get Myheaders() {
    let token = '';

   
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('userdata') || '';
    }

    return {
      headers: {
        token: token
      }
    };
  }

  
  WishListIDS = new BehaviorSubject<any[]>([]);


  addToWishList(productId:string):Observable<any>{


    return this.hHttpClient.post(environment.baseURL+'wishlist',
      {
    "productId": productId
},this.Myheaders
      
    )
  }

  

   loadWishList() {


   this.getAllWishList().subscribe({
     next:(res)=>{


    this.WishListIDS.next(res.data)




      },
      error:(err)=>{
        
      },
   })
  }



  removeFromWishList(productId:string):Observable<any>{
return this.hHttpClient.delete(environment.baseURL+'wishlist/'+productId,this.Myheaders)
  }



  getAllWishList():Observable<any>{

    return this.hHttpClient.get(environment.baseURL+'wishlist',this.Myheaders)

    
  }


  
}
