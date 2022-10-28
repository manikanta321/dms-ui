import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxTemplateServiceService {
  taxurl = environment.url;


  constructor(private http: HttpClient) { }


  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

const idToken = localStorage.getItem("token");
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


gettaxlist(data){
  
  // const data={
  //   userTypes:[],
  //   statuss:[],
  // }//     const idToken = localStorage.getItem('token');
// console.log('idtoken',idToken)
//     const headers = {
//       'accesstoken': localStorage.getItem('token'),
//       //'methodtype': 'RULES'
//     };
JSON.stringify(data)
  return this.http.post<any>('http://52.172.24.161:801/api/OtherMasterApi/GetTAxTemplatesList', data);
}

}
