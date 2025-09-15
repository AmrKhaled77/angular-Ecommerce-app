import { Component, inject, signal } from '@angular/core';
import { HomeServices } from '../../servises/home-services';
import { ProdctsDatum } from '../../intrfaces/products-data';
import { Observable, Observer } from 'rxjs';
import { ProductItem } from "../../../../shared/componants/product-item/product-item";
import { SlicePipe } from '@angular/common';



@Component({
  selector: 'app-home-products',
  imports: [ProductItem,SlicePipe],
  templateUrl: './home-products.html',
  styleUrl: './home-products.scss'
})
export class HomeProducts {



  
    private readonly homeServices:HomeServices=inject(HomeServices);




  ngOnInit(): void {


   this.getProducts()

  }



  productsData = signal<ProdctsDatum[] | null>(null);






getProducts() {
  this.homeServices.getAllProducts().subscribe({
    next: (res) => {
      this.productsData.set(res.data); 


      
      
    },
    error: (err) => {
      console.log("Error loading products");
      console.log(err);
    }
  });
}


}



