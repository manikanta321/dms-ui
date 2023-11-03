import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssosiationServicesService {
  userurl = environment.url;


  constructor(private http: HttpClient) { }


  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("token");
    
    console.log('idtoken', idToken)
    // alert(idToken)

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


  getGeographies() {
    return this.http.get<any>(`${this.userurl}DealerApi/GetAssociationGeoDropdown`);
  }


  getDealers() {
    return this.http.get<any>(`${this.userurl}DealerApi/GetAssoDealerdrop`);
  }


  public getDealersList(data) {

    return this.http.post<any>(this.userurl + 'DealerApi/GetAllDealerAssociation', data);
  }

 


  public editbulkdealer(data) {
    return this.http.post<any>(this.userurl + 'DealerApi/UpdateBulkEditAssociations', data);
  }


  public getgeo(produId) {
    return this.http.get<any>(`${this.userurl}DealerApi/GetAboveDefaultGeography?stockitemid=${produId}`);

  }
  public getgeoOfdealer(DealerId) {
    return this.http.get<any>(`${this.userurl}DealerApi/GetAboveDefaultGeographyBasedOnDealer?dealerId=${DealerId}`);

  }

  public tooltipStockItemDetailList(prodctId: any) {
    return this.http.get<any>(`${this.userurl}DealerApi/GetStockItemDetailList?ProductSKUId=${prodctId}`);


  }
  public dealerdrop(data) {
    return this.http.post<any>(this.userurl + 'DealerApi/GetDealerBasedonGeog', data);

  }

  public getdealerEntireList(data) {
    return this.http.post<any>(this.userurl + 'DealerApi/GetGeographyDetailsForDealer', data);

  }



  public getProductEntireList(data) {
    return this.http.post<any>(this.userurl + 'DealerApi/GetGeographyDetailsForProductInAssociation', data);

  }


  public addassosiation(data) {
    return this.http.post<any>(this.userurl + 'DealerApi/AddAssociations', data);

  }



  public addassosiationofproduct(data) {
    return this.http.post<any>(this.userurl + 'DealerApi/AddAssociationProducts', data);

  }


  public AssociationbulkeditList(data)
  {
    return this.http.post<any>(this.userurl + 'DealerApi/BulkUploadEditAssociation', data);
  }

  public SaveBulkUploadAssocition(data){
    console.log("Data",data)
    return this.http.post<any>(this.userurl + 'DealerApi/SaveBulkUploadEditAssociation', data);
  
  }
  
  // dealer add associations
public addassociations(){
  return this.http.get<any>(`${this.userurl}OtherMasterApi/GetGeographyHierarchy`)
}

}
// http://13.126.235.145:801/api/DealerApi/GetStockItemDetailList?ProductSKUId=42