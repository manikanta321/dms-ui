import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {
  panelOpenState = true;
  fullname:any='';
  username:any='';
  Lastname:any='';
  email:any='';
  phone:any='';
  role123 :any='';
  role :any;

  toppingList: any= [];
  data:any;
  roleId:any;
  roleName:any;
  // userType: string[] = ['Admin', 'Business Manager', 'Order Manager', 'Viewer','Business Manager', 'Order Manager', 'Viewer'];
  toppings = new FormControl(this.toppingList);
  UserId: any;
  errorMsg: any;
  name = 'Angular';  
    
  productForm!: FormGroup;  
  constructor(private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private user:UserService,
    private sharedService:SharedService,
    private fb:FormBuilder,
     
  
    ) { 
      this.productForm = this.fb.group({  
        name: '',  
        quantities: this.fb.array([]) ,  
      });  
    }

  ngOnInit(): void {
    this.roleItems();
    const user = localStorage.getItem("userID");
    console.log('userID', user)
    this.UserId=user
    this.user.GetEditUSer(user).subscribe((res:any)=>{
      console.log('respose',res)
   this.data=res.response;
console.log('dataofEdit',this.data)
   this.patchValue()

    })
  }


  

    
  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({  
      qty: '',  
      price: '',  
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.productForm.value);  
  }  
  patchValue(){
    this.username=this.data.userName
    this.email=this.data.email;
    this.fullname=this.data.firstName;
    this.Lastname=this.data.lastName;
    this.phone=this.data.mobilePhone;
    this.roleId=this.data.roleId;
    this.role123=this.data.roleName
    console.log('this.log',this.role)
  }
  closeDialog(){
    this.dialogRef.close();
  }
  selectedValue($event){
    // alert($event)
this.roleId=$event 
}
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
editUser(){
  let userID = this.user;
      console.log('userID', this.user);
      console.log('userData',userID)

  
    let obj={
      userId:this.UserId,
      FirstName:this.fullname,
      LastName:this.Lastname,
      UserName:this.username,
      Email:this.email,
      MobilePhone:this.phone,
      roleId:this.roleId,
 }
    this.user.EditUser(obj).subscribe((res: any) => {
      this.dialogRef.close()

      if (res.response.result =='successfully updated') {
        this.sharedService.filter('Register click')

      this.dialogRef.close()
      }
      else{
        this.errorMsg=res.response.result;
      }

    })
    // console.log('userID',data)
  }
}
