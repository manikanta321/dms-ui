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
// http://13.126.235.145:801/api/SaleApi/GetSalesList
getDealers(){
  return this.http.get<any>(`${this.userurl}DealerApi/GetAssoDealerdrop`);

}
public getproductlist() {
  return this.http.get<any>(`${this.userurl}MaterialApi/GetStockList`);
}
getGeographies(){
  return this.http.get<any>(`${this.userurl}DealerApi/GetAssociationGeoDropdown`);

}
public getDealeList(data){
  return this.http.post<any>(this.userurl + 'SaleApi/GetSalesList', data);

}
// http://13.126.235.145:801/api/SaleApi/GetSalesUploadList
public getSalesUploadList(data){
  return this.http.post<any>(this.userurl + 'SaleApi/GetSalesUploadList', data);

}
// http://13.126.235.145:801/api/SaleApi/AddBulkSaleOrder
public getBulkSalesUpload(data){
  return this.http.post<any>(this.userurl + 'SaleApi/AddBulkSaleOrder', data);

}
public getReceiptBulkUpload(data){
  return this.http.post<any>(this.userurl + 'OrdersApi/AddBulkOrderReceipt', data);

}
  // http://13.126.235.145:801/api/OrdersApi/AddBulkShipOrder
  public getShipmentBulkUpload(data){
    return this.http.post<any>(this.userurl + 'OrdersApi/AddBulkShipmentNew', data);

  }
  public saveBulkUploadReceipt(data){
    return this.http.post<any>(this.userurl + 'OrdersApi/SaveBulkOrderReceipt', data);

  }
// http://13.126.235.145:801/api/SaleApi/SaveBulkSaleOrder 
public SaveBulkSalesUpload(data){
  return this.http.post<any>(this.userurl + 'SaleApi/SaveBulkSaleOrder', data);

}
public SaveBulkShipmentUpload(data){
  return this.http.post<any>(this.userurl + 'OrdersApi/ImportBulkShipOrder', data);

}
// http://13.126.235.145:801/api/SaleApi/GetSalesUploadDetail
public getSalesBulkUploadList(data){
  return this.http.post<any>(this.userurl + 'SaleApi/GetSalesUploadDetail', data);

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
// sales reports api calls
getTargetList() {
return this.http.get<any>(this.userurl + 'MaterialApi/GetTargetGroupList');
}
onClickSubCat(data:any){
  return this.http.get<any>(this.userurl + 'MaterialApi/GetSUbCAtsOfMultiCats', data);

}
onclickType(data:any){
  return this.http.get<any>(`${this.userurl}MaterialApi/GetTypes?subCatId=${data.subCatId}&flag=${data.flag}`);

}

public getReceiptBulkUploadTarget(data){
  return this.http.post<any>(this.userurl + 'DealerApi/AddBulkDealerTargets', data);

}
public SaveGetbulkuploadTarget(data){
  return this.http.post<any>(this.userurl + 'DealerApi/SaveBulkDealerTargetsBulk', data);

}
}
