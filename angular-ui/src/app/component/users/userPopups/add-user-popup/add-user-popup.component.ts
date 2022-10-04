import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.css']
})
export class AddUserPopupComponent implements OnInit {
  toppingList: any= [];

  toppings = new FormControl(this.toppingList);

  fullname:any;
  username:any;
  email:any;
  phone:any;
  userType: string[] = ['Admin', 'Business Manager', 'Order Manager', 'Viewer','Business Manager', 'Order Manager', 'Viewer'];
  role = new FormControl('');
  errorMsg: any;
  
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(
    private dialogRef: MatDialogRef<AddUserPopupComponent>,

    private user:UserService,

  ) { }

  ngOnInit(): void {
    this.roleItems()
  }

  addUSer(){
  let data={
      FirstName:this.fullname,
      LastName:this.fullname,
      UserName:this.username,
      Email:this.email,
      MobilePhone:this.phone,
      RoleId:this.role
    }
    
    this.user.AddUser(data).subscribe((res: any) => {
      console.log('response',res.response.result)
      if (res.response.result === 'Success') {
        this.dialogRef.close();
      }
      else{
        this.errorMsg=res.response.result;
      }

    })
    console.log('userData',data)
  }
  selectedValue($event){
      alert($event)
this.role=$event  }

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
