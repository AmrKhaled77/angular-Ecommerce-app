import { Component, inject,CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeServices } from '../../servises/home-services';
import { ProdctsDatum } from '../../intrfaces/products-data';
import Swiper from 'swiper/bundle';
import { CartServices } from '../../../cart/services/cart-services';
import { ToastrService } from 'ngx-toastr';
import { ProductItem } from '../../../../shared/componants/product-item/product-item';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.html',
  styleUrls: ['./productdetails.scss'],
    imports: [ProductItem,CurrencyPipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Productdetails {
  
     constructor(private toastr: ToastrService) {
     
     }


    productId!: string;

   private activatedRoute = inject(ActivatedRoute); 
   private homeServices = inject(HomeServices); 


productData = signal<ProdctsDatum | null>(null);


   

isLoading = true;

categorieID:any;

ngOnInit(): void {
   this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;
  this.homeServices.getspecificProducts(this.productId).subscribe({
    next: (res) => {
     

this.categorieID = res.data.category._id;

       this.getYouMayLikeProducts();

      this.productData.set(res.data )  
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
    }
  });
}


  private cartServices =inject(CartServices)

   isAddLoading = signal<boolean>(false);
  onAddToCartClick(){

      this.isAddLoading.set(true);
 this.cartServices.addToCart(this.productId).subscribe({
  next:(res)=>{

console.log(res)
    this.toastr.success(res.message);

   
      this.isAddLoading.set(false);





  },



  error:(err)=>{
    console.log(err)
      this.isAddLoading.set(false);
  }
 })

  }

    YouMayLieProducts = signal<ProdctsDatum[] | null>(null);

  getYouMayLikeProducts(){

      this.YouMayLieProducts.set(null); 
    this.homeServices.getProductsWithCategoreID(this.categorieID).subscribe({
      next: (res) => {
        console.log('you may like::', res);
        this.YouMayLieProducts.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  }


