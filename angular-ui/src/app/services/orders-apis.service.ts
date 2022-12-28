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
  public GetShipingAddress(customerId:any){
    return this.http.get<any>(this.userurl + `OrdersApi/GetShipingAddress?Customerid=${customerId}`)
  }
  public GetBillingAddress(customerId:any){
    return this.http.get<any>(this.userurl + `OrdersApi/GetBillingAddress?Customerid=${customerId}`)
  }

  public GetGeoGrapydropdownList(customerId:any){
    return this.http.get<any>(this.userurl + `OrdersApi/GetordergeoDropdown?Customerid=${customerId}`)
  }
  public addorderNonPromotionsdata(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetStockFullDeatils', data);
  }
  public addorderNonPromotions(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/AddOrder', data);
  }

  public GetOrdersToEdit(CustomerPoId:any){
    return this.http.get<any>(this.userurl + `OrdersApi/GetOrdersToEdit?CustomerPoId=${CustomerPoId}`)
  }
  
  public getShipmentList(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetAllShipments', data);
  }

}

 