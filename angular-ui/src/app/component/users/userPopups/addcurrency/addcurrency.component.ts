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
    editFxId:any;
    editUomData:any;
    EUomId:any;
    EUomName:any;
    EuoMShortName:any;
    EConversionRate:any;
    EuomSymbol:any;
    EConversion:any;
    editcurrencyHeader:any;
    EConversionShow:any;
    editButton:boolean=false;
    uomShortName:any;
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
     this.editcurrencyHeader =localStorage.getItem('headerStatus');
    if(this.editcurrencyHeader == "EditCurrency"){
      this.headerName ="Edit Currency";
      this.editFxId = localStorage.getItem('fxRateId');
      this.EUomId = localStorage.getItem('UomId');
      this.editMaterials();
     alert(this.editFxId)
    } else {
      this.headerName = 'Add Currency';
    }

    //  this.currencyForm.controls["defaultInr"].setValue("1");
    this.UOMSymbol = "1 INR";
  }
  editMaterials(){
    this.editButton =true;
    this.user.getEditCurrencyByID(this.editFxId).subscribe((res) => {   
      this.editUomData = res.response;
      this.EUomName = this.editUomData.uoMName;
      this.EuoMShortName = this.editUomData.uoMShortName;
      this.EConversionRate = this.editUomData.conversionRate;
      this.EuomSymbol = this.editUomData.uomSymbol;
      let convo = 1/(this.EConversionRate);
      let conversion = convo.toFixed(3);
      this.EConversionShow = conversion+" "+this.EuoMShortName;
      this.EConversion = conversion;
      console.log("editUomData",this.editUomData);
    });
  }
  closeDialog(){
    this.dialogRef.close();
  }
  onKeyName(event){
let keyName = event.target.value;
this.Name = keyName;
  }
  onKeyShortName(event){
    let shortName = event.target.value;
this.uomShortName = shortName;
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
    if(this.editButton ==false){
    const data={
      UoMName:this.Name,
      UoMShortName:this.uomShortName,
      ConversionRate:this.conversionRates,
      UOMSymbol:this.UOMSymbol,
      Conversion:this.conversion,

      
    }
    this.user.addcurrency(data).subscribe((res) => {    
      this.currencyForm.reset(); 
      // console.log(res,"123456987654")
    });
  }else{
    const data2={
      UoMName:this.EUomName,
      UoMShortName:this.EuoMShortName,
      ConversionRate:this.EConversionRate,
      UOMSymbol:this.EuomSymbol,
      Conversion:this.EConversion,
      UoMId:this.EUomId
      
    }
      this.user.addcurrency(data2).subscribe((res) => {   
        this.editUomData = res;
        console.log("editUomData",this.editUomData);
      });
  }
  this.closeDialog();
  }
  currencyConverteredValue(data:any){
    // alert("suceccy key finction")
  }
}
