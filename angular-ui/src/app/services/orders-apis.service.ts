import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersApisService {
  userurl = environment.url;


  constructor(private http: HttpClient) { }


  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("token");
    debugger
    console.log('idtoken', idToken)
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
  // orders apis
  public getorderDeatilslist(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetAllOrders', data);
  }

  public getorderNonPromotionslist(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetOrderNonPromoList', data);
  }

  public taxtemplatedropdown(){
    return this.http.get<any>(this.userurl + 'DealerApi/GetAddressTaxList')
  }
}

 