import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Auth {




userData: BehaviorSubject<any>;

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  let initialData = null;

  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('userdata');
    if (token) {
      initialData = jwtDecode(token);
    }
  }

  this.userData = new BehaviorSubject<any>(initialData);
}

   private http=inject(HttpClient)






    register(options:object){

      return this.http.post(environment.baseURL+'auth/signup',options)
    }


    Login(options:object){
      return this.http.post(environment.baseURL+'auth/signin',options)

      
    }



setUserData() {
  const data = localStorage.getItem('userdata');
  console.log('Token from localStorage:', data);
  if (data) {
    try {
      const decoded = jwtDecode(data);
      console.log('Decoded token:', decoded);
      this.userData.next(decoded);
    } catch (e) {
      console.error('JWT decode error:', e);
      this.userData.next(null);
    }
  } else {
    this.userData.next(null);
  }
}




  
}
