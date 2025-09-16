import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartServices {

  private httpClient:HttpClient=inject(HttpClient)



 cartCount = new BehaviorSubject<number>(0);

  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  
  get Myheaders(): object {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('userdata') || '';
    }
    return {
      headers: { token }
    };
  }

   

  



  


  




 ngOnInit() {
    
  }

  addToCart(productId: string): Observable<any> {

  
    return this.httpClient.post(
      `${environment.baseURL}cart`,
      { productId: productId },
      this.Myheaders
    );
  }




  getCart():Observable<any>{

    return this.httpClient.get(environment.baseURL+'cart',this.Myheaders)



  }

  UpdateInCart(productId:string,count:number):Observable<any>{

    return this.httpClient.put(environment.baseURL+`cart/${productId}`,{
    "count": count
}

,this.Myheaders)
  }



  deletFromCart(productId:string):Observable<any>{

    return this.httpClient.delete(environment.baseURL+"cart/"+productId
      ,this.Myheaders
    )
  }


  clearCart():Observable<any>{

    return this.httpClient.delete(environment.baseURL+'cart'
      ,this.Myheaders
    )
  }


  
}
