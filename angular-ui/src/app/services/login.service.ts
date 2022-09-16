import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginurl = environment.Url;
  constructor(private http: HttpClient) { }


  public getloginDeatils(usernameofuser:any,passwordofuser:any) {
    return this.http.get<any>(this.loginurl + `Authentication/Login?userName=${usernameofuser}&password=${passwordofuser}`);
    
  }
}
