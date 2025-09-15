import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordServices {



  httpClient=inject(HttpClient)


  forgetPassword(email:string):Observable<any>{
    return this.httpClient.post(environment.baseURL+'auth/forgotPasswords',
      
      {
    "email":email
},
      
      
      )
  }



  verifyResetCode(code:any):Observable<any>{
    return this.httpClient.post(environment.baseURL+'auth/verifyResetCode'


      ,
      {
    resetCode:code
}
    )
  }



  resetPassword(email:string ,newPass:string):Observable<any>{
  return  this.httpClient.put(environment.baseURL+'auth/resetPassword',

      {
    email:email,
    newPassword: newPass
}
    )
  }



  
}
