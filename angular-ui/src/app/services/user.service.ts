import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userurl = environment.url;


  constructor(private http: HttpClient) { }


  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

const idToken = localStorage.getItem("token");
debugger
console.log('idtoken',idToken)
alert(idToken)

if (idToken) {
  const cloned = req.clone({
      headers: req.headers.set("Authorization",
          "Bearer " + idToken)
  });

  return next.handle(cloned);
}
else {
  return next.handle(req);
}
}

  // protected getByHeaders<T>(url: string, headers: any): Observable<T> {
  //   return this.http.post<any>(url, {headers: headers})
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }
  public getuserDeatils() : Observable<any>{
let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
    const data={
      userTypes:[],
      statuss:[],
    }//     const idToken = localStorage.getItem('token');
// console.log('idtoken',idToken)
//     const headers = {
//       'accesstoken': localStorage.getItem('token'),
//       //'methodtype': 'RULES'
//     };
JSON.stringify(data)
    return this.http.post<any>(this.userurl + 'UserMgmtApi/GetAllUsers', data);
    
  }
//   UserMgmtApi/AddEditUser?FirstName=manik&LastName=kantaa&Email=mani@gmail.com&UserName=manikantaa&
// MobilePhone=5646555566&RoleId=116

AddUser(data){
  let firstname
  return this.http.post<any>(this.userurl + 'UserMgmtApi/AddEditUser?',data);

}

EditUser(obj){
  return this.http.post<any>(this.userurl + 'UserMgmtApi/AddEditUser',obj);

}

EditUserProfile(profileObj){
  return this.http.post<any>(this.userurl + 'UserMgmtApi/UpdateProfile',profileObj);
}

GetEditUSer(userID:any){
  return this.http.get<any>(`${this.userurl}UserMgmtApi/GetUserDetailsToEdit?userId=${userID}`);

}

   public getuserDeatilsUser(data) {
     
    return this.http.post<any>(this.userurl + 'UserMgmtApi/GetAllUsers', data);
   }

   public getorderDeatilslist(data) {
     
    return this.http.post<any>(this.userurl + 'OrdersApi/GetAllOrders', data);
   }

public getroleDetails(){
  return this.http.get<any>(this.userurl + 'UserMgmtApi/GetUserTypes');

}

public getGographicDropdown(){
  return this.http.get<any>(this.userurl + 'DealerApi/GetGeographyListdrop')
}

public getstatusDeatils(){
  return this.http.get<any>(this.userurl + 'UserMgmtApi/GetUserStatusList');
}

public dealersStatus(){
  return this.http.get<any>(this.userurl + 'DealerApi/GetDealerStatusdrop');
}

public UserFilterServices(roleId:any,statusId:any){
  if(statusId==undefined){
    statusId='0'
  }
  if(roleId==undefined){
    roleId='0'
  }
  return this.http.get<any>(this.userurl + `UserMgmtApi/GetAllUsers?userTypeId = ${roleId}&statusid = ${statusId}&Search = ""`);

}
public activeDeavtive(data){
  return this.http.post<any>(this.userurl + 'UserMgmtApi/ActiveDeactive', data);
}
public changepassword(data){
  return this.http.post<any>(this.userurl + 'UserMgmtApi/UpdatePasswordByAdmin', data);
}
public Forgotchangepassword(data){
  return this.http.post<any>(this.userurl + 'Account/ResetUserPassword', data);
}

forgotPassword(data){
  return this.http.post<any>(this.userurl + 'Account/ForgotPassword',data);
}

public changePasswordByUser(userChangePasswordData){
return this.http.post<any>(this.userurl +'UserMgmtApi/UpdatePassword',userChangePasswordData);
// userId=215&currentPassword=Abc@123&newPassword=Abc@1233
}

public getcurrencylist(data){
  return this.http.post<any>(this.userurl + 'OtherMasterApi/GetCurrencyList', data);
}
public otherstatus(data){
  return this.http.get<any>(this.userurl + 'OtherMasterApi/GetStatusList', data);
}
public tatemplatestatus(data){
  return this.http.get<any>(this.userurl + 'OtherMasterApi/GetTaxTemplateStatus', data);
}
public addcurrency(data){
  return this.http.post<any>(this.userurl + 'OtherMasterApi/AddEditCurrency', data);
}
public activeDeavtiveCurrency(data){
  return this.http.post<any>(this.userurl + 'OtherMasterApi/ActiveDeactive', data);
}
public getEditCurrencyByID(FxID:any){
  return this.http.get<any>(`${this.userurl}OtherMasterApi/GetCurrencyDetailsToEdit?FxRateId=${FxID}`);
}
//get Dealer list
public getAllDealerList(data){
  return this.http.post<any>(this.userurl + 'DealerApi/GetAllDealers',data);
}

public getproductlist(){
  return this.http.get<any>(`${this.userurl}MaterialApi/GetStockList`);
}

public activateDeactivateDealers(data){

  return this.http.post<any>(this.userurl + 'DealerApi/ActiveDeactiveDealer', data);
}

}
