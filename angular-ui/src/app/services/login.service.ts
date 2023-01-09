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
  // userRolesData = [
  //   {
  //     "title": "settingmaterials",
  //     "uniquekey": null,
  //     "siteMapId": 90501,
  //     "submenulist": [],
  //     "permission": [
  //       {
  //         "action": "CLS_VIEW",
  //         "status": true
  //       },
  //       {
  //         "action": "CLS_ADD",
  //         "status": true
  //       },
  //       {
  //         "action": "MAT_VIEW",
  //         "status": true
  //       },
  //       {
  //         "action": "MAT_ADD",
  //         "status": true
  //       },
  //       {
  //         "action": "MAT_ACT",
  //         "status": true
  //       },
  //       {
  //         "action": "MAT_DEACT",
  //         "status": true
  //       },
  //       {
  //         "action": "MAT_EDIT",
  //         "status": true
  //       }
  //     ],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "settinggeographies",
  //     "uniquekey": null,
  //     "siteMapId": 90502,
  //     "submenulist": [],
  //     "permission": [
  //       {
  //         "action": "VIEW",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_LEVEL",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_GEOGRAPHY",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_GEOGRAPHY",
  //         "status": true
  //       }
  //     ],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "settingothermasters",
  //     "uniquekey": null,
  //     "siteMapId": 90503,
  //     "submenulist": [],
  //     "permission": [
  //       {
  //         "action": "VIEW_UOM",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_UOM",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_UOM",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_TAX",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_TAX",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_TAX",
  //         "status": true
  //       },
  //       {
  //         "action": "ACTIVATE_TAX",
  //         "status": true
  //       },
  //       {
  //         "action": "DEACTIVATE_TAX",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_CURRENCY",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_CURRENCY",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_CURRENCY",
  //         "status": true
  //       }
  //     ],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "settingusers",
  //     "uniquekey": null,
  //     "siteMapId": 90504,
  //     "submenulist": [],
  //     "permission": [
  //       {
  //         "action": "VIEW",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD",
  //         "status": false
  //       },
  //       {
  //         "action": "EDIT",
  //         "status": false
  //       },
  //       {
  //         "action": "RESET_PASSWORD",
  //         "status": false
  //       },
  //       {
  //         "action": "ACTIVATE",
  //         "status": false
  //       },
  //       {
  //         "action": "DEACTIVATE",
  //         "status": false
  //       },
  //       {
  //         "action": "SEARCH_USER",
  //         "status": false
  //       }
  //     ],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "dealerdashboard",
  //     "uniquekey": null,
  //     "siteMapId": 90505,
  //     "submenulist": [],
  //     "permission": [
  //       {
  //         "action": "VIEW_ASSOCIATION",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_ASSOCIATION",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_ASSOCIATION",
  //         "status": true
  //       },
  //       {
  //         "action": "BULK_EDIT_ASSOCIATION",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_DEALER",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_DEALER",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_DEALER",
  //         "status": true
  //       },
  //       {
  //         "action": "ACT_DEALER",
  //         "status": true
  //       },
  //       {
  //         "action": "DEACT_DEALER",
  //         "status": true
  //       },
  //       {
  //         "action": "DOWNLOAD_DEALER",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_PROMOTION",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_PROMOTION",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_PROMOTION",
  //         "status": true
  //       },
  //       {
  //         "action": "ACT_PROMOTION",
  //         "status": true
  //       },
  //       {
  //         "action": "DEACT_PROMOTION",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_REPORTS",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_TARGETS",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_TARGETS",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_TARGETS",
  //         "status": true
  //       },
  //       {
  //         "action": "ACT_TARGETS",
  //         "status": true
  //       },
  //       {
  //         "action": "DEACT_TARGETS",
  //         "status": true
  //       },
  //       {
  //         "action": "UPLOAD_TARGETS",
  //         "status": true
  //       }
  //     ],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "saleslistdashboard",
  //     "uniquekey": null,
  //     "siteMapId": 90506,
  //     "submenulist": [],
  //     "permission": [
  //       {
  //         "action": "VIEW",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_SALES",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_SALES",
  //         "status": true
  //       },
  //       {
  //         "action": "UPLOAD_SALES",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_SALES_UPLOAD",
  //         "status": true
  //       },
  //       {
  //         "action": "DOWNLOAD_SALES",
  //         "status": true
  //       }
  //     ],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "orderdashboard",
  //     "uniquekey": null,
  //     "siteMapId": 90507,
  //     "submenulist": [],
  //     "permission": [
  //       {
  //         "action": "VIEW",
  //         "status": true
  //       },
  //       {
  //         "action": "ADD_ORDER",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_ORDER",
  //         "status": true
  //       },
  //       {
  //         "action": "CONFIRM_ORDER",
  //         "status": true
  //       },
  //       {
  //         "action": "SHIP_ORDER",
  //         "status": true
  //       },
  //       {
  //         "action": "RECEIVE_ORDER",
  //         "status": true
  //       },
  //       {
  //         "action": "UPLOAD_INVOICE",
  //         "status": true
  //       },
  //       {
  //         "action": "DOWNLOAD_ORDER",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_SHIPMENT",
  //         "status": true
  //       },
  //       {
  //         "action": "EDIT_SHIPMENT",
  //         "status": true
  //       },
  //       {
  //         "action": "RECEIVE_SHIPMENT",
  //         "status": true
  //       },
  //       {
  //         "action": "UPLOAD_SHIPMENT",
  //         "status": true
  //       },
  //       {
  //         "action": "VIEW_INVOICE",
  //         "status": true
  //       },
  //       {
  //         "action": "DOWNLOAD_INVOICE",
  //         "status": true
  //       }
  //     ],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "maindashboard",
  //     "uniquekey": null,
  //     "siteMapId": 90508,
  //     "submenulist": [],
  //     "permission": [],
  //     "viewPage": true
  //   },
  //   {
  //     "title": "menuhelp",
  //     "uniquekey": null,
  //     "siteMapId": 90509,
  //     "submenulist": [],
  //     "permission": [],
  //     "viewPage": true
  //   }
  // ]


  userRolesSubject: Subject<any> = new Subject();
  async CallGetUserRoles() {

    // if (this.userRolesData) {
    //   localStorage.setItem('userroles', JSON.stringify(this.userRolesData));
    //   this.userRolesSubject.next(this.userRolesData);
    //   this.router.navigate(['../dashbord/user']);
    //   return;
    // }

    let roleId = localStorage.getItem('roleId');
    if (roleId) {
      try {
        let data: any = await this.getUserRolesFromAPI(roleId);
        if (data) {
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
          localStorage.setItem('userroles', JSON.stringify(formattedData));
          this.userRolesSubject.next(formattedData);
        }

        // localStorage.setItem('userroles', JSON.stringify(data.response));
        this.router.navigate(['../dashbord/user']);
      } catch (error) {
        console.log('error', error);
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
