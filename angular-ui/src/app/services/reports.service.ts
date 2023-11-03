import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  apiUrl = environment.url;
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


  
  getInvoicetranscationDropdown(userId) {
    return this.http.get<any>(`${this.apiUrl}SaleApi/GetInvoicetranscationDropdown?CurrentUserId=${userId}`);
  }

  getDealersDropdown(userId) {
    return this.http.get<any>(`${this.apiUrl}SaleApi/GetDealersDropdown?CurrentUserId=${userId}`);
  }
  
  postMProductdropbyDealeridGeoid(data) {
    return this.http.post<any>(`${this.apiUrl}SaleApi/GetMProductdropbyDealeridGeoid`, data);
  }
  
  getSalesReportList(data) {
    return this.http.post<any>(`${this.apiUrl}SaleApi/SalesReportLists`, data);
  }
  
  
  getGeoDataBasedOnDealer(data) {
    return this.http.post<any>(`${this.apiUrl}SaleApi/Getgeobasedondealer`, data);
  }

}
