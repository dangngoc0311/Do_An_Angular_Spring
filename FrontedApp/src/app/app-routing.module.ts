
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminguardGuard } from './guard/adminguard.guard';
import { LoginAdminComponent } from './login-admin/login-admin.component';


const routes: Routes = [
  {
    path: 'admin',canActivate:[AdminguardGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },{
    path:'loginAdmin',component: LoginAdminComponent}

  ,
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
