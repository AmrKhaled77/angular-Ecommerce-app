import { Component, inject, signal } from '@angular/core';
import { Brand } from '../home/intrfaces/brands';
import { BrandsServices } from './services/brands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands {

  
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
