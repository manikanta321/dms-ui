import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesServicesService {
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

 
public getdealersaleDropDown(){
  return this.http.get<any>(`${this.userurl}DealerApi/GetAssoDealerdrop`);

}

public getdealerGeoDropDown(data){
  return this.http.get<any>(`${this.userurl}OrdersApi/GetordergeoDropdown?CustomerId=${data}`);

}
public getDealerAdress(id){
  return this.http.get<any>(`${this.userurl}OrdersApi/GetBillingAddress?Customerid=${id}`);

}

public getDealerProduct(data){
  return this.http.post<any>(this.userurl + 'SaleApi/GetProductdropbyDealerid', data);

}


public getProductInfo(id){
  return this.http.get<any>(`${this.userurl}SaleApi/GetProductSales?StockItemId=${id}`);
}
 

public AddSales(data){
  return this.http.post<any>(this.userurl + 'SaleApi/AddSaleOrder', data);

}
}
