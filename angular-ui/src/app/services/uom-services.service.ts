

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UomServicesService {
  uomurl = environment.url;


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
public getuomDeatils(data) : Observable<any>{
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
      //     const idToken = localStorage.getItem('token');
  // console.log('idtoken',idToken)
  //     const headers = {
  //       'accesstoken': localStorage.getItem('token'),
  //       //'methodtype': 'RULES'
  //     };
  JSON.stringify(data)
      return this.http.post<any>(this.uomurl + 'OtherMasterApi/GetAllUOMs', data);
      
    }
adduom(data){
  return this.http.post<any>(this.uomurl + 'OtherMasterApi/AddEditUOM', data);

}
deleteUom(UomId){
  return this.http.get<any>(this.uomurl + `OtherMasterApi/DeleteUoM?UoMId=${UomId}`);
}
edititems(UomId){
  return this.http.get<any>(this.uomurl + `OtherMasterApi/GetUOMDetailsToEdit?UoMId=${UomId}`);
}

                            //  http://52.172.24.161:801/api/GetUserTypes
//   User types dropdown : - http://52.172.24.161:801/api/GetUserTypes

// Status Dropdown : - http://52.172.24.161:801/api/GetUserStatusList

  // getPastClassDetails(classId: any) {
  //   return this.http.get(`${this.liveApi}/api/v1/eclasses/${classId}/download`);
  // }
}
