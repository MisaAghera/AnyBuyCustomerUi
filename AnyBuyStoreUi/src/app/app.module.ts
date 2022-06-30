import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { CartComponent } from './cart/cart.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptor } from '@angular/common/http';
import { ErrorCatchingInterceptor } from './shared/interceptors/error-catching.interceptor';
import { CartCardComponent } from './cart-card/cart-card.component';
import { AllUserOrdersComponent } from './all-user-orders/all-user-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    OrdersComponent,
    CategoriesComponent,
    ProductsingleComponent,
    CartComponent,
    SubcategoriesComponent,
    ProductCardComponent,
    ProductsComponent,
    ProfileDetailsComponent,
    EditAddressComponent,
    CartCardComponent,
    AllUserOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
