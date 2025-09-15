import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { NavBar } from "./shared/componants/navbarComponant/nav-bar/nav-bar";
import { Fotter } from "./shared/componants/fotterComponant/fotter/fotter";
import { Register } from "./Features/auth/register/register/register";
import { WishListServices } from './Features/wish-list/services/wish-list-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Fotter, ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'E-commerce';


  constructor(private flowbiteService: FlowbiteService) {}
    
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });


   


  }
}
