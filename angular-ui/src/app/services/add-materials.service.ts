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
onclickcat(catId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/GetSUbCAts?catid=${catId}`);

}

onclicksubcat(catId:any){
  return this.http.get<any>(`${this.addmaterialsurl}MaterialApi/GetTypes?subCatId=${catId}`);

}
getMaterialIdentifier(){
  return this.http.get<any>(this.addmaterialsurl + 'MaterialApi/GetMAterialIdentifier');
}
public getuomDeatils(data) : Observable<any>{
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  JSON.stringify(data)
      return this.http.post<any>(this.addmaterialsurl + 'OtherMasterApi/GetAllUOMs', data);
      
    }
}