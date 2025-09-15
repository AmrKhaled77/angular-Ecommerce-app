

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServices {


httpClient=inject(HttpClient);

  getAllCategories(): Observable<any> {
  return this.httpClient.get(environment.baseURL+'categories');
}


GETSubCategories(id:string): Observable<any>{
return  this.httpClient.get(environment.baseURL+'categories/'+id+'/subcategories')
}


GetAllCategoriesProducts(id:string): Observable<any>{
 return this.httpClient.get(environment.baseURL+'products?category[in]='+id)
}
  
}
