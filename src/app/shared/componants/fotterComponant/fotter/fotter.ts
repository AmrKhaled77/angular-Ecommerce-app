import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-fotter',
  imports: [],
  templateUrl: './fotter.html',
  styleUrl: './fotter.scss'
})
export class Fotter {

   constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }

}
