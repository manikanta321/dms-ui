import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userurl = environment.Url;


  constructor(private http: HttpClient) { }


  public getuserDeatils() {
    return this.http.get<any>(this.userurl + 'UserMgmtApi/GetAllUsers');
    
  }

  // getPastClassDetails(classId: any) {
  //   return this.http.get(`${this.liveApi}/api/v1/eclasses/${classId}/download`);
  // }
}
