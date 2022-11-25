import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class ResetPassword implements OnInit {
  // Params: Params ;

  showPassword: boolean = false;
  showre_Password: boolean = false;
  showoldPassword: boolean = false;
  enterfirst:any;
  entersecond:any;
  error: any;
  myform !: FormGroup;
  username = new FormControl('', [
    Validators.required,
]);
confirmPassward = new FormControl('', [
    Validators.required,
    ]);
  snapshotParam: any = '';
  Token: any = '';

  constructor(private user:UserService,
    private route: ActivatedRoute,
    private router: Router,) { }
// 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Token = params['Token'];
      console.log(this.Token); 

      
      // Print the parameter to the console. 
  });
  }
  public PasswordVisibilityLatest(): void {
    this.showPassword = !this.showPassword;
  }
  public PasswordVisibilityreenter(): void {
    this.showre_Password = !this.showre_Password;
  }
  public PasswordVisibilityold(): void {
    this.showoldPassword = !this.showoldPassword;
  }
  
  UpdatePassword(){

      if(this.enterfirst==this.entersecond){
        let data={
          token:this.Token,
          Password:this.entersecond,
        }
        this.user.changepassword(data).subscribe((res: any) => {
          this.router.navigate(['']);
        })
        // this.dialog.open(RestPwsdUserPopupComponent, {panelClass: 'activeSuccessPop'});
        // this.dialogRef.close();
      }else {
     this.error="*Entered fields doesn’t match"
      }

  }


}