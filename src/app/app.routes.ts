import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'cart',
        component:CartComponent,
    },
    {
        path:'detail-page/:productId',
        component:ProductDetailComponent
    },
    {
        path:'profile',
        component:ProfileComponent
    },
    {
        path:'**',
        redirectTo:'home',
        pathMatch:'full'
    }
];
