import { WishListServices } from './../wish-list/services/wish-list-services';
import { Component, inject, OnInit } from '@angular/core';
import { MainSlyder } from "./componants/main-slyder/main-slyder";
import { CategoriesSlyder } from "./componants/categories-slyder/categories-slyder";

import { Products } from "../products/products";
import { HomeProducts } from "./componants/home-products/home-products";
import { PopularBrands } from "./componants/popular-brands/popular-brands";

@Component({
  selector: 'app-home',
  imports: [MainSlyder, CategoriesSlyder, HomeProducts, PopularBrands],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  

  constructor(){
        

  }

  wishListServices=inject(WishListServices)

  ngOnInit(): void {
    
    this.wishListServices.loadWishList();
  
  }

}
