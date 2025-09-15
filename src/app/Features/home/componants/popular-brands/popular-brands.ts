import { Component, inject, OnInit, signal } from '@angular/core';
import { HomeServices } from '../../servises/home-services';
import { Brand } from '../../intrfaces/brands';
import { SlicePipe } from '@angular/common';
import { BrandsServices } from '../../../brands/services/brands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-brands',
  imports: [SlicePipe,RouterLink],
  templateUrl: './popular-brands.html',
  styleUrl: './popular-brands.scss'
})
export class PopularBrands implements OnInit {


  brandServices=inject(BrandsServices)


 brands = signal<Brand[]>([]);


  ngOnInit(): void {
    
    this.brandServices.getAllBrands().subscribe({

      next:(res)=>{


        this.brands.set(res.data)




      },
      error:(err)=>{},
    })
  }
  
  
}
