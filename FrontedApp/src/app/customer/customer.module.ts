import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { IndexComponent } from './index/index.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ListProductComponent } from './pages/product/list-product/list-product.component';
import { DetailProductComponent } from './pages/product/detail-product/detail-product.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCartComponent } from './pages/product/list-cart/list-cart.component';
import { UsercouponComponent } from './pages/product/usercoupon/usercoupon.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { CheckoutComponent } from './pages/product/checkout/checkout.component';
import { ThankComponent } from './pages/product/thank/thank.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrdertrackingComponent } from './pages/product/ordertracking/ordertracking.component';
import { OrdertrackingDetailComponent } from './pages/product/ordertracking-detail/ordertracking-detail.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { AccountDetailComponent } from './pages/account/account-detail/account-detail.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    IndexComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    ListProductComponent,
    DetailProductComponent,
    ListCartComponent,
    UsercouponComponent,
    RegisterUserComponent,
    LoginUserComponent,
    CheckoutComponent,
    ThankComponent,
    OrdertrackingComponent,
    OrdertrackingDetailComponent,
    AccountDetailComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressAnimation:'decreasing',
      closeButton :true
    }),
    Ng2OrderModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class CustomerModule {}
