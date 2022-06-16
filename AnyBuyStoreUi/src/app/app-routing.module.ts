import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
const routes: Routes = [
  { path:"signup", component:SignupComponent },
  { path:"login", component:LoginComponent },
  { path:"order", component:OrdersComponent },
  { path:"product/:id", component:ProductsingleComponent },
  { path:"cart", component:CartComponent },
  { path:"home", component:HomeComponent },
  { path: 'subcategory/:id', component: SubcategoriesComponent },
  { path:"profile-details", component:ProfileDetailsComponent },
  { path:"edit-address", component:EditAddressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
