import { DetailProductComponent } from './pages/product/detail-product/detail-product.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ListProductComponent } from './pages/product/list-product/list-product.component';
import { ListCartComponent } from './pages/product/list-cart/list-cart.component';
import { UsercouponComponent } from './pages/product/usercoupon/usercoupon.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { CheckoutComponent } from './pages/product/checkout/checkout.component';
import { ThankComponent } from './pages/product/thank/thank.component';
import { CustomerguardGuard } from '../guard/customerguard.guard';
import { OrdertrackingComponent } from './pages/product/ordertracking/ordertracking.component';
import { OrdertrackingDetailComponent } from './pages/product/ordertracking-detail/ordertracking-detail.component';
import { AccountDetailComponent } from './pages/account/account-detail/account-detail.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'listProduct', component: ListProductComponent },
      {path:'detailProduct/:id',component:DetailProductComponent},
      {path:'cart',component: ListCartComponent},
      {path:'userCoupon',component: UsercouponComponent,canActivate: [CustomerguardGuard]},
      {path:'registerUser',component: RegisterUserComponent},
      {path:'loginUser',component: LoginUserComponent},
      {path:'checkOut',component: CheckoutComponent,canActivate: [CustomerguardGuard]},
      {path:'thanks',component: ThankComponent,canActivate: [CustomerguardGuard]},
      {path:'orderTracking',component: OrdertrackingComponent,canActivate: [CustomerguardGuard]},
      {path:'orderTrackingDetail/:id',component: OrdertrackingDetailComponent,canActivate: [CustomerguardGuard]},
      {path:'userDetail',component:AccountDetailComponent,canActivate: [CustomerguardGuard]},
      {path:'forgotPassword',component:ForgotPasswordComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
