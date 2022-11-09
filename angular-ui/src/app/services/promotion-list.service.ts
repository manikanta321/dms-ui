import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PromotionListService {
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



promotionTabledata(data){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetPromotionList', data);
}

promotionlist(){
  return this.http.get<any>(`${this.userurl}PromotionsApi/GetPromotionTypes`);

}
productListApi(){
  return this.http.get<any>(`${this.userurl}MaterialApi/GetProductGroupList`);
}

giographiesList(){
  return this.http.get<any>(`${this.userurl}PromotionsApi/GetGeographies`);
}
getstatusDeatils(){
  return this.http.get<any>(`${this.userurl}PromotionsApi/GetPromotionSatusList`);

}
}
