import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var getUser: any = sessionStorage.getItem('adminUser');
      var check: any = JSON.parse(getUser);
      if (check==null) {
        this.router.navigate(['loginAdmin'], { queryParams: { returnUrl: state.url }});
      }
      return true;
  }

}
