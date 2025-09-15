import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServices {



  private readonly httpClient:HttpClient=inject(HttpClient);


getAllProducts(): Observable<any> {
  return this.httpClient.get(environment.baseURL+'products');
}


getspecificProducts(productId:string): Observable<any> {
  return this.httpClient.get(environment.baseURL+`products/${productId}`);
}


getProductsWithCategoreID(id:string): Observable<any>{

   return this.httpClient.get(environment.baseURL+'products?category[in]='+id)

}








  
}
