import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userurl = environment.url;


  constructor(private http: HttpClient) { }


  public getuserDeatils() {
    return this.http.get<any>(this.userurl + 'UserMgmtApi/GetAllUsers');
    
  }

public getroleDetails(){
  return this.http.get<any>(this.userurl + 'UserMgmtApi/GetUserTypes');

}

public getstatusDeatils(){
  return this.http.get<any>(this.userurl + 'UserMgmtApi/GetUserStatusList');
}



                            //  http://52.172.24.161:801/api/GetUserTypes
//   User types dropdown : - http://52.172.24.161:801/api/GetUserTypes

// Status Dropdown : - http://52.172.24.161:801/api/GetUserStatusList

  // getPastClassDetails(classId: any) {
  //   return this.http.get(`${this.liveApi}/api/v1/eclasses/${classId}/download`);
  // }
}
