import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { OrderServices } from './services/order-services';
import { IOrder } from './models/order-interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders implements OnInit {


expandedOrder = signal<number | null>(null);

  orderServices=inject(OrderServices)
 initialData:any = null;
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  

  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('userdata');
    if (token) {
      this.initialData = jwtDecode(token);
    }
  }

  
}


ngOnInit(): void {

  this.getOrders()
  
}

 allOrders = signal<IOrder[]>([]);


getOrders(){



this.orderServices.getAllUSerOrders(this.initialData!.id).subscribe({
  next:(res)=>{

    this.allOrders.set(res)

    
  },
  error:(err)=>{},
})


}

}
