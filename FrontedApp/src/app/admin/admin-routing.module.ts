import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DetailBookComponent } from './pages/book/detail-book/detail-book.component';
import { InsertBookComponent } from './pages/book/insert-book/insert-book.component';
import { ListBookComponent } from './pages/book/list-book/list-book.component';
import { UpdateBookComponent } from './pages/book/update-book/update-book.component';
import { InsertCategoryComponent } from './pages/category/insert-category/insert-category.component';
import { ListCategoryComponent } from './pages/category/list-category/list-category.component';
import { UpdateCategoryComponent } from './pages/category/update-category/update-category.component';
import { InsertCouponComponent } from './pages/coupon/insert-coupon/insert-coupon.component';
import { ListCouponComponent } from './pages/coupon/list-coupon/list-coupon.component';
import { UpdateCouponComponent } from './pages/coupon/update-coupon/update-coupon.component';
import { HomeComponent } from './pages/home/home.component';
import { ListorderComponent } from './pages/order/listorder/listorder.component';
import { OrderdetailComponent } from './pages/order/orderdetail/orderdetail.component';
import { ListReviewComponent } from './pages/reviewbook/list-review/list-review.component';
import { DetailUserComponent } from './pages/user/detail-user/detail-user.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'insertCategory', component: InsertCategoryComponent },
      { path: 'listCategory', component: ListCategoryComponent },
      { path: 'deleteCategory', component: ListCategoryComponent },
      { path: 'updateCategory/:id', component: UpdateCategoryComponent },
      { path: 'updateBook/:id', component: UpdateBookComponent },
      { path: 'listBook', component: ListBookComponent },
      { path: 'deleteBook', component: ListBookComponent },
      { path: 'insertBook', component: InsertBookComponent },
      { path: 'insertCoupon', component: InsertCouponComponent },
      { path: 'listCoupon', component: ListCouponComponent },
      { path: 'deleteCoupon', component: ListCouponComponent },
      { path: 'updateCoupon/:id', component: UpdateCouponComponent },
      { path: 'listOrder', component: ListorderComponent },
      { path: 'orderDetail/:id', component: OrderdetailComponent },
      { path: 'homeAdmin', component: HomeComponent },
      { path: 'listReview', component: ListReviewComponent },
      { path: 'detailBook/:id', component: DetailBookComponent },
      { path: 'listUser', component: ListUserComponent },
      { path: 'userDetail', component: DetailUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
