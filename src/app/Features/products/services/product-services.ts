import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductServices {

    private http = inject(HttpClient);


    
getProducts(limit: number, page: number, minPrice?: number | null, maxPrice?: number | null):Observable<any> {
  let url = environment.baseURL+`products?limit=${limit}&page=${page}`;
  if (minPrice) url += `&price[gte]=${minPrice}`;
  if (maxPrice) url += `&price[lte]=${maxPrice}`;
  return this.http.get(url);
}
  
}
