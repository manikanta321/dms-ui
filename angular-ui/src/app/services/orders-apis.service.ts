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
  public addorderPromotionsdata(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetStockFullDeatilsForPromo', data);
  }

  public addorderNonPromotions(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/AddOrder', data);
  }

  public GetOrdersToEdit(CustomerPoId:any){
    return this.http.get<any>(this.userurl + `OrdersApi/GetOrdersToEdit?OrderId=${CustomerPoId}`)
  }

  public GetConfirmOrder(data){
    return this.http.post<any>(this.userurl + 'OrdersApi/OrderConfirmReject', data);
  }
  
  public getShipmentList(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetAllShipments', data);
  }
  public getOrderReceiptList(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetOrderReceiptList', data);
  }
  // http://13.126.235.145:801/api/OrdersApi/GetShipUploadList

  public getDownloadShipmentList(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetShipUploadList', data);
  }
  public orderpromotionimages(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetPromotionListForOrder', data);
  }
  public GetProductsOfPromotionForOrder(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetProductsOfPromotionForOrder', data);
  }
  
  public getShippingandPackingcharges(data) {

    return this.http.post<any>(this.userurl + 'OrdersApi/GetShippingAndPackingCharges', data);
  }


  public shipOrder(data) {

    return this.http.get<any>(this.userurl + `OrdersApi/GetOrderByship?orderId=${data}`)
  }  

  public reciveshipment(data) {
    return this.http.post<any>(this.userurl + 'OrdersApi/GetOrderByshipReceive', data);
  }  

  
  public reciveshipmentfororder(data) {
    return this.http.post<any>(this.userurl + 'OrdersApi/GetOrderToView', data);
  }  

  public saveShipOrder(data) {
    return this.http.post<any>(this.userurl + 'OrdersApi/AddShipOrder', data);
  }
  public saveReciveShipment(data) {
    return this.http.post<any>(this.userurl + 'OrdersApi/AddReceiveShipOrder', data);
  }

  
  public calculateTotal(data) {
    return this.http.post<any>(this.userurl + 'OrdersApi/GetShippingAndPackingChargesforship', data);
  }
    
  public dealersDetails(data) {
    return this.http.get<any>(this.userurl + `CommonApi/GetDealerId?CurrentUserId=${data}`)
  }

  
getStatusDrodownData(data){
  return this.http.post<any>(this.userurl + 'OrdersApi/GetAllStatusdrop', data);  
}
deleteshipment(data){
  return this.http.post(this.userurl+'OrdersApi/DeleteShipment',data)
}
  
}
 