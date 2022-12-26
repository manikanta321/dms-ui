import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TargetListService {
  classificationurl = environment.url;

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

  getTargetList() {
    //   return this.http.post<any>(`${this.classificationurl}MaterialApi/GetTargetGroup`,TargetGroup);
    // }

    // let options = {
    //   headers: new HttpHeaders().set('Content-Type', 'application/json')
    // };
    // JSON.stringify(TargetGroup)
    // return this.http.post<any>(this.classificationurl + 'MaterialApi/GetTargetGroup', TargetGroup);
  return this.http.get<any>(this.classificationurl + 'MaterialApi/GetTargetGroupList');
    

  }
// getTargetGrpList(){
//   return this.http.get<any>(this.classificationurl + 'MaterialApi/GetTargetGroup');
// }
  getTargetCode() {
    return this.http.get<any>(this.classificationurl + 'MaterialApi/GenerateTargetCode');

  }
 createTargetGroup(data): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    JSON.stringify(data)
    return this.http.post<any>(this.classificationurl + 'MaterialApi/AddEditTargetGroup', data);

  }
  getTargetSearch(data:any){
    // let options = {
    //   headers: new HttpHeaders().set('Content-Type', 'application/json')
    // };
    // JSON.stringify(data)
    return this.http.post<any>(this.classificationurl + 'MaterialApi/GetTargetGroup', data);

  }

  // getTargetSearch(){
  //   return this.http.get<any>(this.classificationurl + 'MaterialApi/GetTargetGroupList');
  // }

  onclickcat(Subdata){
    return this.http.post<any>(`${this.classificationurl}MaterialApi/GetSUbCAtsOfMultiCats`,Subdata);
  
  }

  getTargetListAll(data) {
    //   return this.http.post<any>(`${this.classificationurl}MaterialApi/GetTargetGroup`,TargetGroup);
    // }

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    JSON.stringify(data)
    return this.http.post<any>(this.classificationurl + 'PromotionsApi/GetProductList', data);

  }

}
