import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',
  styleUrls: ['./addcurrency.component.css']
})
export class AddcurrencyComponent implements OnInit {
    name:any;
    headerName:any;
    currencyForm!:FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    private user:UserService,) { }

  ngOnInit(): void {
    // this.addcurrency()
    var editcurrencyHeader =localStorage.getItem('headerStatus');
    if(editcurrencyHeader == "EditCurrency"){
      this.headerName ="Edit Currency";
    } else {
      this.headerName = 'Add Currency';
    }

    this.addcurrencyForm();
    this.currencyForm.controls["conversionFixed"].setValue("1 INR");
  }
  closeDialog(){
    this.dialogRef.close();
  }


  calCulating(data:any){
    //this.currencyForm.controls["conversion"].setValue("1 INR");
  }

  addcurncy(){
    const data={
      statuss:[],
      search:"",
    }
    this.user.addcurrency(data).subscribe((res) => {     
    });
  }

  addcurrencyForm(){
    this.currencyForm = this.fb.group({
      name: ["", [Validators.required]],
      displayUnit: ["", [Validators.required]],
      conversionRate: ["", [Validators.required]],
      conversion:["", [Validators.required]],
      conversionFixed:["", [Validators.required]],
    });
  }

}
