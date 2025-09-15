import { Component, inject, signal } from '@angular/core';
import { ProductServices } from './services/product-services';
import { ProductItem } from "../../shared/componants/product-item/product-item";
import { FormsModule } from '@angular/forms'; // ⬅️ needed for ngModel

@Component({
  selector: 'app-products',
  imports: [ProductItem, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  private pService = inject(ProductServices);

  products = signal<any[]>([]);
  page = signal(1);
  limit = 12;
  totalPages = signal(1);
  isLoading = signal(false);

  minPrice: number | null = null;
  maxPrice: number | null = null;
    isFilterOpen = false; 

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);

    this.pService
      .getProducts(this.limit, this.page(), this.minPrice, this.maxPrice)
      .subscribe({
        next: (res) => {
          this.products.set(res.data);
          this.totalPages.set(res.metadata?.numberOfPages ?? 1);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
  }

  applyFilter() {
    this.page.set(1); 
    this.loadProducts();
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadProducts();
    }
  }
}
