import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import Swiper from 'swiper/bundle';

// Register modules


@Component({
  selector: 'app-main-slyder',
  imports: [],
  templateUrl: './main-slyder.html',
  styleUrl: './main-slyder.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainSlyder {

   ngOnInit(): void {
    // Optional: if you want to initialize manually
    new Swiper('.mainSlider', {
      spaceBetween: 10,
      loop: true,
      navigation: true,
      pagination: { clickable: true },
      autoplay: { delay: 2500, disableOnInteraction: false },
    });
  }

}
