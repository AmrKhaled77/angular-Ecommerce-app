import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdressesServices {

   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  httpClient=inject(HttpClient)


  

  
  Myheaders:object={
    headers:{

          token:localStorage.getItem('userdata')

    }

  


}


addAddress(data:any):Observable<any>{

return  this.httpClient.post(environment.baseURL+'addresses',
data

  ,this.Myheaders)
}



RemoveAddress(id:string):Observable<any>{

return  this.httpClient.delete(environment.baseURL+'addresses/'+id,this.Myheaders)
}


GetSpecificAddress(id:string):Observable<any>{

return  this.httpClient.get(environment.baseURL+'addresses/'+id,this.Myheaders)
}


GetAllAddresses():Observable<any>{

return  this.httpClient.get(environment.baseURL+'addresses/',this.Myheaders)
}







}

