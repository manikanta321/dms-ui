import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { FirstDataRenderedEvent } from 'ag-grid-community';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { OtherMasterService } from 'src/app/services/other-master.service';
import { SharedServicesProfilePicService } from 'src/app/services/shared-services-profile-pic.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { UserService } from 'src/app/services/user.service';
import { EditProfilePopupComponent } from '../edit-profile-popup/edit-profile-popup.component';
import { EditProfileSuccessPopupComponent } from '../edit-profile-success-popup/edit-profile-success-popup.component';
// import { RestPwsdUserPopupComponent } from '../users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  EmployeeName: any = '';
  FirstName: any = '';
  LastName: any = '';
  userName: any = '';
  constUserName:any = '';
  Email: any = '';
  phone: any = '';
  rolename: any = '';
  UserId: any;
  RoleId: any;
  errorMsg: any;
  data: any;
  masterData:any;
  imageUrl: any = "";
  localdata: any;
  // roleId: any;
  base64textString = "";
  selecetdFile: any;
  imagePreview: any;
  lastLogin: any;
  Imgpreview: boolean = false;

  constructor(private observer: BreakpointObserver,
    private user: UserService,
    public dialog: MatDialog,
    // private dialogRef: MatDialogRef<any>,
    private sharedService: SharedService,
    private sharedService1: SharedServicesProfilePicService,
    // private otherMasterService: OtherMasterService,
    private spinner: NgxSpinnerService
  ) {

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
    if (lastLoginDate == null) {
      this.lastLogin = '';
    }
    else {
      this.lastLogin = moment(lastLoginDate).format('DD MMM YYYY, HH:mm A');
    }

    this.getUserProfileDetails();
    // const userRoleId = localStorage.getItem("RoleId");
    // this.RoleId = localStorage.getItem("RoleId");
    // alert(this.RoleId);
    // console.log("RoleId",this.RoleId)
  }

  getUserProfileDetails() {
    this.user.GetEditUSer(this.UserId).subscribe((res: any) => {
      this.data = res.response;
      this.masterData = JSON.parse(JSON.stringify(this.data));
      if (this.data.imageUrl == null) {
        this.Imgpreview = false;
      } else {
        this.Imgpreview = true;
      }
      this.RoleId = this.data.roleId;
      localStorage.setItem('RoleId', this.data.roleId)
      // alert(this.data.roleId)
      this.patchValue()
    })
  }

  patchValue() {
    this.EmployeeName = this.data.firstName +' ' + this.data.lastName;
    this.FirstName = this.data.firstName;
    this.LastName = this.data.lastName;
    this.userName = this.data.userName;
    this.constUserName = this.data.userName;
    this.Email = this.data.email;
    this.phone = this.data.mobilePhone;
    this.rolename = this.data.roleName;
    this.base64textString = this.data.imageUrl;
  }
  editUser() {
    let profileObj = {
      userId: this.UserId,
      FirstName: this.FirstName,
      LastName: this.LastName,
      userName: this.userName,
      Email: this.Email,
      Mobile: this.phone,
      RoleId: this.RoleId,
      imageUrl: this.base64textString
    }
    // console.log("EditUser", profileObj);
    this.spinner.show();
    this.user.EditUserProfile(profileObj).subscribe((res: any) => {
      // console.log("EditUser", profileObj)
      // this.dialogRef.close();
      this.spinner.hide();
      if (res.response.result == 'successfully updated') {
        sessionStorage.setItem("profileImage", this.base64textString);
        // console.log("SetImage", JSON.stringify(this.base64textString));
        localStorage.setItem('logInImage', this.base64textString)
        localStorage.setItem('userName', this.FirstName + ' ' + this.LastName);
        
        this.dialog.open(EditProfileSuccessPopupComponent, { panelClass: 'activeSuccessPop' });
        this.sharedService1.filter('Register click');
        this.getUserProfileDetails();
      }
      else {
        this.errorMsg = res.response.result;
        alert(this.errorMsg);
      }

    }, (err) => {
      this.spinner.hide();
    })

  }

  discard() {
    let dialogRef = this.dialog.open(EditProfilePopupComponent);
    dialogRef.afterClosed().subscribe((res) => {
      // console.log(res);
      if (res) {
        this.data = JSON.parse(JSON.stringify(this.masterData));
        this.patchValue();
      }
    })
    // this.isOpen = false;
  }
  ToggleSideNav(value: any) {
    this.sidenav.toggle()
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
    this.getUserProfileDetails();
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

    // console.log(this.base64textString, "base64")
  }



}
