import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../../core/services/auth/auth';
import { log } from 'console';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar implements OnInit {

   constructor(@Inject(PLATFORM_ID) private platformId: any) {}


private router:Router =inject(Router);
 isOpen = false; //

   auth :Auth=inject(Auth);




  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }

   

  
  }

   isLogin=signal<boolean>(false);


  ngOnInit(): void {

    
    
    this.CheckLogin();
  }
  
  


 


   
CheckLogin() {
  this.auth.userData.subscribe(user => {
    console.log('User from BehaviorSubject:', user);
    this.isLogin.set(!!user); 
  });
}








  logOut(){
    localStorage.removeItem('userdata');
    this.auth.userData.next(null)

     
    this.router.navigate(['/login'])

  }

}
