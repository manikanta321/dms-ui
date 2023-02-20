import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedServicesProfilePicService } from 'src/app/services/shared-services-profile-pic.service';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,
    private sharedService:SharedService,
    private sharedService1: SharedServicesProfilePicService
    ) { }

  ngOnInit(): void {
  }
  discard() {
    this.sharedService1.filter('Register click');
    this.dialogRef.close(true)
    sessionStorage.setItem("Close","Close");
  }
  close(){
    this.dialogRef.close(false)
    sessionStorage.setItem("Close","");
  }
}
