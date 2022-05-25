import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { IndexComponent } from './index/index.component';
import { ListCategoryComponent } from './pages/category/list-category/list-category.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { InsertCategoryComponent } from './pages/category/insert-category/insert-category.component';
import { UpdateCategoryComponent } from './pages/category/update-category/update-category.component';
import { UpdateBookComponent } from './pages/book/update-book/update-book.component';
import { ListBookComponent } from './pages/book/list-book/list-book.component';
import { InsertBookComponent } from './pages/book/insert-book/insert-book.component';
import { ListCouponComponent } from './pages/coupon/list-coupon/list-coupon.component';
import { InsertCouponComponent } from './pages/coupon/insert-coupon/insert-coupon.component';
import { UpdateCouponComponent } from './pages/coupon/update-coupon/update-coupon.component';
import { ListorderComponent } from './pages/order/listorder/listorder.component';
import { OrderdetailComponent } from './pages/order/orderdetail/orderdetail.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListReviewComponent } from './pages/reviewbook/list-review/list-review.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { DetailBookComponent } from './pages/book/detail-book/detail-book.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { DetailUserComponent } from './pages/user/detail-user/detail-user.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ListCategoryComponent,
    NavbarComponent,
    InsertCategoryComponent,
    UpdateCategoryComponent,
    UpdateBookComponent,
    ListBookComponent,
    InsertBookComponent,
    ListCouponComponent,
    InsertCouponComponent,
    UpdateCouponComponent,
    ListorderComponent,
    OrderdetailComponent,
    ListReviewComponent,
    DetailBookComponent,
    ListUserComponent,
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
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
    NgxSummernoteModule,
    AngularEditorModule
  ],
})
export class AdminModule {}
