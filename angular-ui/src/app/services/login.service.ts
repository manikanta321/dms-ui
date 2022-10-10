import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import 'url-search-params-polyfill';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginurl = environment.url;
  constructor(private http: HttpClient) { }


  public getloginDeatils(usernameofuser:any,passwordofuser:any) {
    // let body = new URLSearchParams();
    // body.set('emailId', 'STK-00001');
    // body.set('password', 'infi');

    // let body = `emailId=STK-00001&password=infi`;
    

  //   console.log('body',body)
  //   // let body = `emailId=${usernameofuser}&password=${passwordofuser}`;
   let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let body1 = new URLSearchParams();
    body1.set("emailId",usernameofuser);
    body1.set("password", passwordofuser);
    let body = `emailId=${usernameofuser}&password=${passwordofuser}`;


  //  let params = new HttpParams()
  //   .set("emailId",usernameofuser)
  //   .set("password", passwordofuser)
  
  
      return this.http.post(this.loginurl + `Account/GetToken`, body1, options)
    


//  return this.http
//   .post(this.loginurl + `Account/GetToken`, body.toString(), options)
//   .subscribe(response => {
//       //...
//   });

    // return this.http.get(this.loginurl + `/Account/GetToken`,body.toString(), options);
    
  }
}
