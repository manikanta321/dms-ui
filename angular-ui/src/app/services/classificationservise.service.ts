import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClassificationserviseService {

  
  classificationurl = environment.url;


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
  return this.http.get<any>(this.classificationurl + 'MaterialApi/GetCategories');

}
onclickcat(catId:any){
  return this.http.get<any>(`${this.classificationurl}MaterialApi/GetSUbCAts?catid=${catId}`);

}

onclicksubcat(catId:any){
  return this.http.get<any>(`${this.classificationurl}MaterialApi/GetTypes?subCatId=${catId}`);

}

addCatagory(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/AddCategory', data);
  
}
addsubCatagory(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/AddsubCategory', data);
  
}
addtypes(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/Addstocktype', data);

}
deletecatagory(data){
  return this.http.get<any>(`${this.classificationurl}MaterialApi/DeleteCategory?CategoryId=${data}`)

}

daleteSubcatagory(data){
  return this.http.get<any>(`${this.classificationurl}MaterialApi/DeletesubCategory?subCategoryId=${data}`)

  // return this.http.post<any>(this.classificationurl + 'MaterialApi/DeletesubCategory', data);

}


deleteType(data){
  return this.http.get<any>(`${this.classificationurl}MaterialApi/Deletetype?typeId=${data}`)

  // return this.http.post<any>(this.classificationurl + 'MaterialApi/Deletetype', data);


}

}
