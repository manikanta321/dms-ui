import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, zip } from 'rxjs';
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
  userRolesData = [];


  userRolesSubject: Subject<any> = new Subject();
  async CallGetUserRoles() {
    let roleId = localStorage.getItem('logInId');
    if (roleId) {

      // localStorage.setItem('userroles', JSON.stringify(this.userRolesData));
      if (localStorage.getItem('userroles')) {

        localStorage.setItem('userroles', JSON.stringify(this.userRolesData));
        this.userRolesSubject.next(this.userRolesData);

      } else {
        try {
          let data: any = await this.getUserRolesFromAPI(roleId);

          let formattedData = data.response.map(x => {
            x.title = x.title.toLowerCase();
            if (x.permission.length == 0) {
              x.viewPage = true;
            } else {
              let status = false;      
              x.permission.forEach(y => {
                if (y.action.toLowerCase().indexOf('view') != -1 && y.status) {
                    status = true;
                }
              })
              x.viewPage = status;
            }

            return x;
          });

          console.log(formattedData);
          localStorage.setItem('userroles', JSON.stringify(formattedData));
          this.userRolesSubject.next(formattedData);
          // localStorage.setItem('userroles', JSON.stringify(data.response));
          this.router.navigate(['../dashbord/user']);
        } catch (error) {
          console.log('error', error);
        }
      }
    } else {
      this.router.navigate(['/login']);
    }

  }

  getUserRolesFromAPI(roleId) {

    let body = { roleId: Number(roleId) }
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.post(this.loginurl + `UserMgmtApi/GetUserRoles`, body, options).toPromise()
  }
}
