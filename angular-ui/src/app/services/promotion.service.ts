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

public closePromotion(id){
  return this.http.get<any>(this.userurl + 'PromotionsApi/PromotionClose?ProductPromotionsId='+id)
}

public GetPGDetailListofShortcode(id){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPSCDetailList?ProductShortCode='+id)
}



public GetPGDetailListProductGroup(id){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPGDetailList?ProductGroupId='+id)
}


public GetPGDetailListofSubGroup(id,id2){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPSGDetailList?ProductGroupId='+ id +'&ProductSubGroupId='+id2)
}


// http://13.126.235.145:801/api/PromotionsApi/GetPGDetailList?ProductGroupId=18
// http://52.172.24.161:801/api/PromotionsApi/GetPGDetailList?ProductGroupId=18
public GetPSGDetailList(){
return this.http.get<any>(this.userurl + 'PromotionsApi/GetPSGDetailList?ProductGroupId=18&ProductSubGroupId=29')
}
// http://52.172.24.161:801/api/PromotionsApi/GetPSGDetailList?ProductGroupId=18&ProductSubGroupId=29
public GetPSCDetailList(){
  // return this.http.get<any>(this.userurl + 'PromotionsApi/GetPSCDetailList?ProductSKUId=22')
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPSCDetailList?ProductShortCode=m')
}
// http://13.126.235.145:801/api/PromotionsApi/GetPSCDetailList?ProductShortCode=m
// http://52.172.24.161:801/api/PromotionsApi/GetPSCDetailList?ProductSKUId=22
 GetSUbCAtsOfMultiCats(data : any){
return this.http.post<any>(this.userurl + 'MaterialApi/GetSUbCAtsOfMultiCats', data)
}
// http://13.126.235.145:801/api/MaterialApi/GetSUbCAtsOfMultiCats
GetProductIdentifier(){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetProductIdentifier')
}
// http://13.126.235.145:801/api/PromotionsApi/GetAddProductTG

addTargetGroup(data:any){
  return this.http.post<any>(this.userurl + 'MaterialApi/GetAddProductTG', data)
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
GetSubGroupProductGroupList1(subGroupId:any){
  return this.http.get<any>(this.userurl + 'MaterialApi/GetProductGroupList',subGroupId)
}
// http://13.126.235.145:801/api/MaterialApi/GetProductGroupList
// http://13.126.235.145:801/api/MaterialApi/GetCategories
Image(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/UploadImg', data)
}
// http://13.126.235.145:801/api/PromotionsApi/UploadImg
DropDownPromotionType(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/AddEditBuy_APBGet_XPY', data)
}
// http://13.126.235.145:801/api/PromotionsApi/AddEditBuy_APBGet_XPY
GetPromotionDealerList(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetPromotionDealerList', data)
}


getProductsubgropStockitemID(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetAddProductShortCode', data)
}
getProductGroup(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetAddProductGroup', data)
}

getProductSubGroup(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetAddProductSubGroup', data)
}
getProductSubGroups(subProdId:any){
  return this.http.get<any>(`${this.userurl}MaterialApi/GetSubProducts?ParentId=${subProdId}`);
}
firstPromotion(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/AddEditPromotions', data)
}
viewPromotion(data: any){
  return this.http.post<any>(this.userurl + 'PromotionsApi/GetPromotionByIdToView', data)
}

getPromotionById(data: any){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetPromotionByIdToEdit?promotionId='+data);
}

public Promogetgeo(){
  return this.http.get<any>(this.userurl + 'PromotionsApi/GetAboveDefaultGeographyforPromotion')

}
// http://13.126.235.145:801/api/PromotionsApi/GetAboveDefaultGeographyforPromotion
// http://13.126.235.145:801/api/PromotionsApi/GetPromotionDealerList
}

