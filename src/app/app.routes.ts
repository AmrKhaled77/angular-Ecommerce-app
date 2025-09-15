import { Routes } from '@angular/router';
import { Register } from './Features/auth/register/register/register';
import { Login } from './Features/auth/login/login';
import { Home } from './Features/home/home';
import { Products } from './Features/products/products';
import { Cart } from './Features/cart/cart';
import { Categories } from './Features/categories/categories';
import { Brands } from './Features/brands/brands';
import { NotFound } from './shared/componants/not-found/not-found';

import { Productdetails } from './Features/home/componants/productdetails/productdetails';
import { authGuard } from './core/directives/auth-guard';
import { WishList } from './Features/wish-list/wish-list';
import { ForgetPasswordComponent } from './Features/auth/forget-password/forget-password';
import { VerifyCode } from './Features/auth/forget-password/componants/verify-code/verify-code';
import { ResetPass } from './Features/auth/forget-password/componants/reset-pass/reset-pass';
import { CategoriesDetails } from './Features/categories/componants/categories-details/categories-details';
import { BrandsDetails } from './Features/brands/componants/brands-details/brands-details';
import { Orders } from './Features/orders/orders';
import { Addresses } from './Features/addresses/addresses';

export const routes: Routes = [


{path:'register' ,component:Register , title:'register'},
{path:'login' ,component:Login , title:'login'},
{path:'forgetpassword' ,component:ForgetPasswordComponent , title:'forgetpassword'},
{ path: 'verify-code', component: VerifyCode,title:'VerifyCode' },
{ path: 'reset-password', component: ResetPass,title:'reset-password' },
{path:'home' ,component:Home , title:'home', canActivate:[authGuard]},
{path:'wishList' ,component:WishList , title:'WishList', canActivate:[authGuard]},
{path:'products' ,component:Products , title:'Products', canActivate:[authGuard]},
{path:'cart' ,component:Cart , title:'cart', canActivate:[authGuard]},
{path:'categories' ,component:Categories , title:'Categories', canActivate:[authGuard]},
{path:'brands' ,component:Brands , title:'brands', canActivate:[authGuard]},
{ path: 'productDetails/:id', component: Productdetails,title:'product Details', canActivate: [authGuard] },
{ path: 'categoriesDetails/:id', component: CategoriesDetails,title:'categories Details', canActivate: [authGuard] },
{ path: 'brandDeatils/:id', component: BrandsDetails,title:'categories Details', canActivate: [authGuard] },


{ path: 'allorders', component: Orders,title:'make order', canActivate: [authGuard] },

{ path: 'makeOrder/:id', component: Addresses,title:'make order', canActivate: [authGuard] },

{ path: '', redirectTo: 'home', pathMatch: 'full' },

{path:'**' ,component:NotFound , title:'NOT FOUND'},



];
