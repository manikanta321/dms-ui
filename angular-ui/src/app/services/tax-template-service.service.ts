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
  return this.http.post<any>(this.taxurl+'OtherMasterApi/GetTAxTemplatesList', data);
}
addtax(data){
  return this.http.post<any>(this.taxurl+'OtherMasterApi/AddTaxTemplate', data);

}
ediTax(data){
  return this.http.post<any>(this.taxurl+'OtherMasterApi/EditTaxTemplate', data);

}
deletetaxdetails(data){
  return this.http.get<any>(this.taxurl+`OtherMasterApi/DeleteTaxTemplateDetails?TaxTemplateDetailsId=${data}`);

}

reactiveuser(taxid){
  return this.http.get<any>(`${this.taxurl}OtherMasterApi/TaxTemplateReactivate?TaxTemplateId=${taxid}`);

}
deactiveuser(taxid){
  return this.http.get<any>(`${this.taxurl}OtherMasterApi/TaxTemplateDeactivate?TaxTemplateId=${taxid}`);

}

gettaxitemToEdit(taxid){
  return this.http.get<any>(`${this.taxurl}OtherMasterApi/GetTaxTemplateToEdit?TaxTemplateId=${taxid}`);

}


}
