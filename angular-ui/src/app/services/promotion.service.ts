import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
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

public GetPromotionTypes() {
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPromotionTypes');
}
// http://52.172.24.161:801/api/PromotionsApi/GetPromotionTypes
public GetProductGroupList(data){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetProductGroupList', data);
}
// http://13.126.235.145:801/api/PromotionsApi/GetProductGroupList
// http://52.172.24.161:801/api/PromotionsApi/GetProductGroupList
public GetProductShortCodeList(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetProductShortCodeList', data)
}
// http://52.172.24.161:801/api/PromotionsApi/GetProductShortCodeList
public GetProductSubGroupList(data:any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetProductSubGroupList',data)
}
// http://52.172.24.161:801/api/PromotionsApi/GetProductSubGroupList
public GetProductList(data : any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetProductList', data) 
}
// http://52.172.24.161:801/api/PromotionsApi/GetProductList
public GetPGDetailList(){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPGDetailList?ProductGroupId=18')
}
// http://52.172.24.161:801/api/PromotionsApi/GetPGDetailList?ProductGroupId=18
public GetPSGDetailList(){
return this.http.get<any>(this.userurl + 'PromotionsApi/GetPSGDetailList?ProductGroupId=18&ProductSubGroupId=29')
}
// http://52.172.24.161:801/api/PromotionsApi/GetPSGDetailList?ProductGroupId=18&ProductSubGroupId=29
public GetPSCDetailList(){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPSCDetailList?ProductSKUId=22')
}
// http://52.172.24.161:801/api/PromotionsApi/GetPSCDetailList?ProductSKUId=22
 GetSUbCAtsOfMultiCats(data : any){
return this.http.post<any>(this.userurl + 'MaterialApi/GetSUbCAtsOfMultiCats', data)
}
// http://13.126.235.145:801/api/MaterialApi/GetSUbCAtsOfMultiCats
GetProductIdentifier(){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetProductIdentifier')
}
// http://13.126.235.145:801/api/PromotionsApi/GetProductIdentifier
GetGeographies(){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetGeographies')
}
// http://13.126.235.145:801/api/PromotionsApi/GetGeographies
 GettypesOfMultiSubCats(data : any){
  return this.http.post<any>(this.userurl + 'MaterialApi/GettypesOfMultiSubCats', data)
}
// http://13.126.235.145:801/api/MaterialApi/GettypesOfMultiSubCats
GetCategories(){
  return this.http.get<any>(this.userurl + 'MaterialApi/GetCategories')
}
GetProductGroupList1(){
  return this.http.get<any>(this.userurl + 'MaterialApi/GetProductGroupList')
}
// http://13.126.235.145:801/api/MaterialApi/GetProductGroupList
// http://13.126.235.145:801/api/MaterialApi/GetCategories
Image(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/UploadImg', data)
}
// http://13.126.235.145:801/api/PromotionsApi/UploadImg

}
