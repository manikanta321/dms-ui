import { Component, OnInit,Output, EventEmitter,ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared-services.service';
import { UserService } from 'src/app/services/user.service';
import { UsersComponent } from '../../users.component';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.css']
})
export class AddUserPopupComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild(UsersComponent) child;
  @Output() ToggleSideNav1  = new EventEmitter();


  toppingList: any= [];

  toppings = new FormControl(this.toppingList);

  fullname:any;
  username:any;
  email:any;
  phone:any;
  Lastname:any;
  userType: string[] = ['Admin', 'Business Manager', 'Order Manager', 'Viewer','Business Manager', 'Order Manager', 'Viewer'];
  role = new FormControl('');
  errorMsg: any;
  message :any;
  message1 :boolean=true;
  
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(
    private router: Router,

    private dialogRef: MatDialogRef<AddUserPopupComponent>,
    private sharedService:SharedService,
    private user:UserService,

  ) { }

  ngOnInit(): void {
    this.roleItems()
    // this.messageEvent.emit(this.message);
  

  }
  eventemiter(){  
    this.sharedService.filter('Register click')
    this.router.navigate(['./dashbord/user']);

    this.sharedService.sendClickEvent();
    this.ToggleSideNav1.emit();
    // this.message = true;
    this.dialogRef.close();

    window.opener.location.reload();
    window.opener.reload();

  }
  addUSer(){
  let data={
      FirstName:this.fullname,
      LastName:this.Lastname,
      UserName:this.username,
      Email:this.email,
      MobilePhone:this.phone,
      RoleId:this.role
    }
    
    this.user.AddUser(data).subscribe((res: any) => {
      console.log('response',res.response.result)
      if (res.response.result === 'Success') {
        this.sharedService.filter('Register click')

        this.dialogRef.close();
    
      }
      else{
        this.errorMsg=res.response.result;
      }

    })
    console.log('userData',data)
  }
  selectedValue(value:any){
      // alert(value)
this.role=value  }

  roleItems(){
    this.user.getroleDetails().subscribe((res: any) => {
      let localdata=res.response;
  console.log('checkdata',localdata)
  
      this.toppingList = localdata.map((data: { roleId: any; roleName: any; }) => {
        return { roleId: data.roleId, roleName: data.roleName };
      });
  
      if (!this.toppingList?.length) {
        this.toppingList = localdata.map((role: { designationName: any; }) => {
          return role.designationName;
        });
      }
      this.toppingList.push()
      // this.toppingList = res.response;
      this.toppings = new FormControl(this.toppingList);
  

    });
  }
}
