import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderServices {
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  httpClient=inject(HttpClient)


  

  
 

   getAllUSerOrders(userID:string):Observable<any>{
    return this.httpClient.get(environment.baseURL+'orders/user/'+userID)
      
    }
  
}
