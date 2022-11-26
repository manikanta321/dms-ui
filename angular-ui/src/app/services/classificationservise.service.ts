import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
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



  getclassification() {
    return this.http.get<any>(this.classificationurl + 'MaterialApi/GetCategories');

  }
  onclickcat(catId: any) {
    return this.http.get<any>(`${this.classificationurl}MaterialApi/GetSUbCAts?catid=${catId}`);

  }

  onclicksubcat(catId: any) {
    return this.http.get<any>(`${this.classificationurl}MaterialApi/GetTypes?subCatId=${catId}`);

  }

  addCatagory(data) {
    return this.http.post<any>(this.classificationurl + 'MaterialApi/AddCategory', data);

  }
  addsubCatagory(data) {
    return this.http.post<any>(this.classificationurl + 'MaterialApi/AddsubCategory', data);

  }
  addtypes(data) {
    return this.http.post<any>(this.classificationurl + 'MaterialApi/Addstocktype', data);

  }
  deletecatagory(data) {
    return this.http.get<any>(`${this.classificationurl}MaterialApi/DeleteCategory?CategoryId=${data}`)

  }

  daleteSubcatagory(data) {
    return this.http.get<any>(`${this.classificationurl}MaterialApi/DeletesubCategory?subCategoryId=${data}`)

    // return this.http.post<any>(this.classificationurl + 'MaterialApi/DeletesubCategory', data);

  }


  deleteType(data) {
    return this.http.get<any>(`${this.classificationurl}MaterialApi/Deletetype?typeId=${data}`)

    // return this.http.post<any>(this.classificationurl + 'MaterialApi/Deletetype', data);


  }

  //geoGraphies services


getGeographyIndealer(){

  return this.http.get<any>(this.classificationurl + 'CommonApi/GetHeirarchyOfDefaultGeography');

}


  getGeographyHierarchy() {
    return this.http.get<any>(this.classificationurl + 'OtherMasterApi/GetGeographyHierarchy');
  }

  getGeographiesById(id, hierarchyIndex) {
    let parmeter = id ? "?id=" + id : "";
    if(hierarchyIndex != null ){
      parmeter += (id ? "&" :"?")+ "hid=" + hierarchyIndex;
    }
    return this.http.get<any>(this.classificationurl + 'OtherMasterApi/GetGeographies' + parmeter);
  }
  
  ActivateDeActivateGeoGraphy(geoGraphyId: number,logedUserId:number, hierarchyIndex:number ) {
    return this.http.get<any>(this.classificationurl + 'OtherMasterApi/ActDeAct_Geography?id='+geoGraphyId +'&logedUserId=' + logedUserId +'&hid=' + hierarchyIndex);
  }

  SaveGeography(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddEditGeography', data);
  }
  
  //get country list
  getCountryList() {
    return this.http.get<any>(this.classificationurl + 'OtherMasterApi/GetAllCountries');
  }

  //getstatelist
  getAllListByCountry(id: any) {
    return this.http.get<any>(this.classificationurl + 'OtherMasterApi/GetGeographies?id=' + id);
  }

  //delete geographies List

  getDeleteListByCountry(id: any) {
    return this.http.get<any>(this.classificationurl + 'OtherMasterApi/DeleteGeography?id=' + id);
  }

  //add country name 
  addCountryName(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddCountry', data);
  }

  //add country name 
  addStateName(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddState', data);
  }

  //add dist name
  addDistName(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddDistrict', data);
  }

  //add city name
  addCityName(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddCity', data);
  }


  //add city name
  addZoneName(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddZone', data);
  }

  //add city name
  addRegionAreaName(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddArea', data);
  }

  //add city name
  AddSubArea(data: any) {
    return this.http.post<any>(this.classificationurl + 'OtherMasterApi/AddSubArea', data);
  }

  //add dealer data
  addDealerData(data: any) {
    return this.http.post<any>(this.classificationurl + 'DealerApi/AddDealer', data);
  }
  editDealerData(id) {
    return this.http.get<any>(this.classificationurl + 'OtherMasterApi/GetDealersToEdit?CustomerId=' + id);

  }

deactivate(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/ActiveDeactiveCategory', data);

}

deactivateSub(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/ActiveDeactiveSubCategory', data);

}

deactivateType(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/ActiveDeactiveType', data);

}


getCatDetailsById(id){
  return this.http.get<any>(this.classificationurl + 'MaterialApi/GetCategoryById?CategoryId=' + id);

}

getsubCatByID(id){
  return this.http.get<any>(this.classificationurl + 'MaterialApi/GetSubCategoryById?SubCategoryId=' + id);

}

getTypesById(id){
  return this.http.get<any>(this.classificationurl + 'MaterialApi/GetTypeById?TypeId=' + id);

}


updateCat(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/UpdateCategory', data);

}

updateSubCat(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/UpdateSubCategory', data);
  
}



updateType(data){
  return this.http.post<any>(this.classificationurl + 'MaterialApi/UpdateType', data);

}


}
