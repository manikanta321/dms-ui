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
    currencyForm:FormGroup;
    disabled:boolean | undefined;
    Name:any;
    conversion:any;
    conversionRates:any;
    editedConversion:any ='';
    UOMSymbol:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,) {
      this.currencyForm = new FormGroup({
        currencyName: new FormControl(	'',	[Validators.required]),
        displayUnits: new FormControl(  '',  [Validators.required]),
        conversionRate: new FormControl(  '',  [Validators.required, Validators.pattern('^.+@.+\..+$')]),
        // Conversion: new FormControl('',   [Validators.required]),
        // defaultInr:new FormControl('',   [Validators.required])

     });
     }

  ngOnInit(): void {
    // this.addcurrency()
    var editcurrencyHeader =localStorage.getItem('headerStatus');
    if(editcurrencyHeader == "EditCurrency"){
      this.headerName ="Edit Currency";
    } else {
      this.headerName = 'Add Currency';
    }

    //  this.currencyForm.controls["defaultInr"].setValue("1");
    this.UOMSymbol = "1 INR";
  }
  closeDialog(){
    this.dialogRef.close();
  }
  onKeyName(event){
let keyName = event.target.value;
this.Name = keyName;
  }
  onKeyConversion(event){
  let keyConversion = event.target.value;
  this.conversionRates = keyConversion;
  if(this.conversionRates>=1){
    let convo = 1/(this.conversionRates);
    this.conversion = convo.toFixed(3);
    this.editedConversion = this.conversion +" "+this.currencyForm.value['displayUnits'];
  }
  else{
    this.editedConversion = '';
  }
  }
  addcurncy(){
    const data={
      UoMName:this.Name,
      UoMShortName:this.currencyForm.value['displayUnits'],
      ConversionRate:this.conversionRates,
      UOMSymbol:this.UOMSymbol,
      Conversion:this.conversion,

      
    }
    this.user.addcurrency(data).subscribe((res) => {    
      this.currencyForm.reset(); 
      // console.log(res,"123456987654")
    });
    this.closeDialog();
  }

  currencyConverteredValue(data:any){
    // alert("suceccy key finction")
  }


}
