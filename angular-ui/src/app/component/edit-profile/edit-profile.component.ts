import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import moment from 'moment';
import { SharedService } from 'src/app/services/shared-services.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  EmployeeName:any = '';
  EmployeeName1:any ='';
  userName: any = '';
  Email: any = '';
  phone: any = '';
  rolename: any = '';
  UserId: any;
  RoleId:any ;
  errorMsg: any;
  data: any;
  imageUrl:any = "";
  localdata: any;
  // roleId: any;
  base64textString= "";
  selecetdFile: any;
  imagePreview: any;
  lastLogin: any;
  Imgpreview:boolean = false;

  constructor(private observer: BreakpointObserver,

    private user: UserService,
    private sharedService: SharedService,) { 

    }
  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  ngOnInit(): void {
    const user = localStorage.getItem("logInId");
    this.UserId = user
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    this.lastLogin = moment(lastLoginDate).format('DD MMM YYYY, HH:mm A');

    this.getUserProfileDetails();
    const userRoleId = localStorage.getItem("RoleId");
    this.RoleId = userRoleId
  }

  getUserProfileDetails(){
  this.user.GetEditUSer(this.UserId).subscribe((res: any) => {
    this.data = res.response;
    if(this.data.imageUrl == null){
      this.Imgpreview = false; 
    }else {
      this.Imgpreview = true;
    }
    localStorage.setItem('RoleId',this.data.roleId)
    this.patchValue()
  })
}

  patchValue() {
    this.EmployeeName = this.data.employeeName;
    this.userName = this.data.userName;
    this.Email = this.data.email;
    this.phone = this.data.mobilePhone;
    this.rolename = this.data.roleName;
    this.base64textString = this.data.imageUrl;     
  }

  editUser() {
    let profileObj = {
      userId: this.UserId,
      EmployeeName: this.EmployeeName,
      userName: this.userName,
      Email: this.Email,
      Mobile: this.phone,
      RoleId: this.RoleId,
      imageUrl: this.base64textString
    }
    this.user.EditUserProfile(profileObj).subscribe((res: any) => {
      // this.dialogRef.close()

      if (res.response.result == 'successfully updated') {
        // this.sharedService.filter('Register click')
        // this.getUserProfileDetails();
        // this.dialogRef.close()
      }
      else {
        this.errorMsg = res.response.result;
      }

    })
    
  }

  ToggleSideNav(value:any){
    this.sidenav.toggle()
  }

// image uploader and converter to base64
  public onFileChanged(event) {
    this.selecetdFile = event.target.files[0];
    if (this.selecetdFile.size <= 1 * 1024 * 1024) {
    this.handleInputChange(this.selecetdFile); 
    }
    else {
        alert('File size should not be greater than 1MB');
          }
  }
  handleInputChange(files) {
    this.imagePreview = files 
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.imagePreview);
  }
  handleReaderLoaded(e) {
    let reader = e.target;
    this.base64textString = reader.result.substr(reader.result.indexOf(',') + 1);
    console.log(this.base64textString,"base64")
  }


  
}
