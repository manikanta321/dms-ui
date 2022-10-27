import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',
  styleUrls: ['./addcurrency.component.css']
})
export class AddcurrencyComponent implements OnInit {
  name:any;

  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,) { }

  ngOnInit(): void {
    // this.addcurrency()
  }
  closeDialog(){
    this.dialogRef.close();
  }
  addcurncy(){
    const data={
      statuss:[],
      search:"",
    }
    this.user.addcurrency(data).subscribe((res) => {     
    });
  }
}
