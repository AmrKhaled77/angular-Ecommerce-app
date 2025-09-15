import { Category } from '../home/intrfaces/products-data';
import { HomeServices } from './../home/servises/home-services';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesServices } from './services/categories-services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {

  categoriesServices=inject(CategoriesServices)

  ngOnInit(): void {
    this.getCategories()
  }


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
