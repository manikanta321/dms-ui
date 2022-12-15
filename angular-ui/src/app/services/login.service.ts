import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
// import 'url-search-params-polyfill';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginurl = environment.url;
  constructor(private http: HttpClient, private router: Router,) { }


  public getloginDeatils(usernameofuser: any, passwordofuser: any) {
    // let body = new URLSearchParams();
    // body.set('emailId', 'STK-00001');
    // body.set('password', 'infi');

    // let body = `emailId=STK-00001&password=infi`;


    //   console.log('body',body)
    //   // let body = `emailId=${usernameofuser}&password=${passwordofuser}`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let body1 = new URLSearchParams();
    body1.set("emailId", usernameofuser);
    body1.set("password", passwordofuser);
    let body = `emailId=${usernameofuser}&password=${passwordofuser}`;


    //  let params = new HttpParams()
    //   .set("emailId",usernameofuser)
    //   .set("password", passwordofuser)


    return this.http.post(this.loginurl + `Account/GetToken`, body1, options)



    //  return this.http
    //   .post(this.loginurl + `Account/GetToken`, body.toString(), options)
    //   .subscribe(response => {
    //       //...
    //   });

    // return this.http.get(this.loginurl + `/Account/GetToken`,body.toString(), options);

  }
  // userRolesData = [];
  userRolesData = [
    {
      key: 'maindashboard',
      title: 'Dashboard',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
        { action: 'activate_deactivate', status: false },
      ]
    },
    {
      key: 'orderdashboard',
      title: 'Orders',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
    {
      key: 'saleslistdashboard',
      title: 'Sales',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
    {
      key: 'dealerdashboard',
      title: 'Dealer',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
    {
      key: 'settingusers',
      title: 'Users',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
    {
      key: 'settingmaterials',
      title: 'Materials',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
    {
      key: 'settinggeographies',
      title: 'Geographies',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
    {
      key: 'settingothermaterials',
      title: 'Other Masters',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
    {
      key: 'menuhelp',
      title: 'Help',
      submenulist: [],
      permissions: [
        { action: 'view', status: true },
        { action: 'add', status: false },
        { action: 'edit', status: false },
        { action: 'delete', status: false },
      ]
    },
  ]


  userRolesSubject: Subject<any> = new Subject();
  async CallGetUserRoles() {
    let roleId = localStorage.getItem('logInId');
    if (roleId) {

      localStorage.setItem('userroles', JSON.stringify(this.userRolesData));
      if (localStorage.getItem('userroles')) {

        localStorage.setItem('userroles', JSON.stringify(this.userRolesData));
        this.userRolesSubject.next(this.userRolesData);

      } else {
        try {
          let data = await this.getUserRolesFromAPI(roleId);

          localStorage.setItem('userroles', JSON.stringify(data));
          this.userRolesSubject.next(data);
        } catch (error) {
          console.log('error', error);
        }
        // this.getUserRolesFromAPI(roleId).subscribe({
        //   next: (data) => {
        //     console.log('data', data);
        //     localStorage.setItem('userroles', JSON.stringify(this.userRolesData));
        //     this.userRolesSubject.next(this.userRolesData);
        //   },
        //   error: (err) => console.log('error', err),
        //   complete: () => console.log('complete')
        // })
      }
    } else {
      this.router.navigate(['/login']);
    }

  }

  getUserRolesFromAPI(roleId) {

    let body = { roleId: roleId }
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(this.loginurl + `UserMgmtApi/GetUserRoles`, body, options).toPromise()
  }
}
