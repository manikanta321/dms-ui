import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
  ) {

    // return true;
    const key = route.data['key'];
    console.log(key);
    let userRoles = JSON.parse(localStorage.getItem('userroles') ?? '[]');


    if (localStorage.getItem('token')) {
      // logged in so return true
      // return true;
      if (key == undefined) {
        return true;
      }

      let showPage = false;
      userRoles.forEach(element => {
        if (element.title == key) {
          showPage = element.viewPage;
        }
      });

      if (!showPage) {
        this.router.navigate(['/page-not-found']);
      }
      return showPage;

    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
    }
    return false;
  }
}
