import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddMaterialsService {

  addmaterialsurl = environment.url;


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
getclassification(){
  return this.http.get<any>(this.addmaterialsurl + 'MaterialApi/GetCategories');
}
getUploadImage(){
  return this.http.get<any>(this.addmaterialsurl + 'MaterialApi/UploadImg');
}
getProductGroup(){
  return this.http.get<any>(this.addmaterialsurl + 'MaterialApi/GetProductGroupList');
}
getProductSubGroup(subProdId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/GetSubProducts?ParentId=${subProdId}`);
}
addProductItem(ProdItem){
  return this.http.post<any>(`${this.addmaterialsurl}MaterialApi/AddProductGroup`,ProdItem);
}
defaultGeoIdProduct(data2){
  return this.http.post<any>(this.addmaterialsurl +'CommonApi/GetHeirarchyOfDefaultGeography',data2);
}
addSubProductItem(ProdItem){
  return this.http.post<any>(`${this.addmaterialsurl}MaterialApi/AddSubProductGroup`,ProdItem);
}
getCountryList(){
  return this.http.get<any>(this.addmaterialsurl + 'OtherMasterApi/GetAllCountries');
}
getAllListByCountry(id:any){
  return this.http.get<any>(this.addmaterialsurl + 'OtherMasterApi/GetGeographies?id='+id);
}
onclickcat(catId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/GetSUbCAts?catid=${catId}`);

}
onEditList(listId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/GetMaterialByIdToEdit?StockItemId=${listId}`);

}
onReactivate(listId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/MaterialReactivate?StockItemId=${listId}`);

}
onDeactivate(listId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/MaterialDeactivate?StockItemId=${listId}`);

}
addMaterialIfProduct(data){
  return this.http.post<any>(this.addmaterialsurl + 'MaterialApi/AddMaterial',data);
}
MaterialIfNotProduct(data){
  return this.http.post<any>(this.addmaterialsurl + 'MaterialApi/AddMaterial',data);
}
onclicksubcat(catId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/GetTypes?subCatId=${catId}`);

}
getMaterialIdentifier(){
  return this.http.get<any>(this.addmaterialsurl + 'MaterialApi/GetMAterialIdentifier');
}
getProductCustomIdentifier(){
  return this.http.get<any>(this.addmaterialsurl + 'MaterialApi/GetProductCustomIdentifier');
}
public getuomDeatils(data) : Observable<any>{
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  JSON.stringify(data)
      return this.http.post<any>(this.addmaterialsurl + 'OtherMasterApi/GetAllUOMs', data);
      
    }
   
}
