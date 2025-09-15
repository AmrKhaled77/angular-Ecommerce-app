import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesServices } from '../../services/categories-services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../models/categories';
import { ProdctsDatum } from '../../../home/intrfaces/products-data';
import { ProductItem } from "../../../../shared/componants/product-item/product-item";

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [ProductItem,RouterLink],
  templateUrl: './categories-details.html',
  styleUrl: './categories-details.scss'
})
export class CategoriesDetails implements OnInit {

  private categoriesServices = inject(CategoriesServices);
  private activatedRoute = inject(ActivatedRoute);

  CtegorieId!: string | null;

  SubCategories = signal<Category[] | null>(null);
  productsData = signal<ProdctsDatum[] | null>(null);

  ngOnInit(): void {
    this.CtegorieId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.CtegorieId) {
      this.GetSubCategores();
      this.GetCategoriesProducts();
    }
  }

  GetSubCategores() {
    this.categoriesServices.GETSubCategories(this.CtegorieId!).subscribe({
      next: (res) => {
        console.log('sub::', res);
        this.SubCategories.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  GetCategoriesProducts() {
    this.productsData.set(null); 
    this.categoriesServices.GetAllCategoriesProducts(this.CtegorieId!).subscribe({
      next: (res) => {
        console.log('productsData::', res);
        this.productsData.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
