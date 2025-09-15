import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsServices } from '../../services/brands';
import { ProdctsDatum } from '../../../home/intrfaces/products-data';
import { ProductItem } from "../../../../shared/componants/product-item/product-item";

@Component({
  selector: 'app-brands-details',
  imports: [ProductItem,RouterLink],
  templateUrl: './brands-details.html',
  styleUrl: './brands-details.scss'
})
export class BrandsDetails implements OnInit {
 private activatedRoute = inject(ActivatedRoute);
 private brandsServices = inject(BrandsServices);

  brandsId!: any;



   ngOnInit(): void {
    this.brandsId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.brandsId) {
     this.getBrandsDeatils()
    }
  }
  productsData = signal<ProdctsDatum[] | null>(null);

  getBrandsDeatils(){
    this.productsData.set(null); 
    this.brandsServices.getBrandDeatils(this.brandsId!).subscribe({
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

