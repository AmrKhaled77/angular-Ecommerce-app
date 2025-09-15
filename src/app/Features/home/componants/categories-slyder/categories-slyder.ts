import { Component, inject, OnInit, signal ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HomeServices } from '../../servises/home-services';


import { register } from 'swiper/element/bundle';
import { Category } from '../../../categories/models/categories';
import { CategoriesServices } from '../../../categories/services/categories-services';
import { RouterLink } from '@angular/router';







@Component({
  selector: 'app-categories-slyder',
  imports: [RouterLink],
  templateUrl: './categories-slyder.html',
  styleUrl: './categories-slyder.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})



export class CategoriesSlyder implements OnInit {
cardItem: any;


  




  ngOnInit(): void {

    this.getCategories()
     
  }



     private readonly categoriesServices=inject(CategoriesServices);




  CategorysList = signal<Category[] | null>(null);


  getCategories() {
  this.categoriesServices.getAllCategories().subscribe({
    next: (res) => {
      this.CategorysList.set(res.data); 

      console.log(res.data)
      

      


      
      
    },
    error: (err) => {
      console.log("Error loading products");
      console.log(err);
    }
  });
}



}
