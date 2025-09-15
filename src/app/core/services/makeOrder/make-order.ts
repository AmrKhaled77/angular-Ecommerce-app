import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakeOrder {


  
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  httpClient=inject(HttpClient)


  

  
  Myheaders:object={
    headers:{

          token:localStorage.getItem('userdata')

    }

  
}


makeCashOrder(id:string , data:any):Observable<any>{
return  this.httpClient.post(environment.baseURL+'orders/'+id,data,this.Myheaders)
}


CheckOutSession(id:string, data:any):Observable<any>{

  return this.httpClient.post(environment.baseURL+'orders/checkout-session/'+id+'?url='+environment.host,data,this.Myheaders)
}


getAllUSerorders(userId:string):Observable<any>{
return this.httpClient.get(environment.baseURL+'orders/user/'+userId)
}





}
