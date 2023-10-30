import { Component, OnInit } from '@angular/core';
 import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { TaxTemplateServiceService } from 'src/app/services/tax-template-service.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { AddtaxTemplateSuccessfulPopupComponent } from './addtax-template-successful-popup/addtax-template-successful-popup.component';
import { OtherMasterService } from 'src/app/services/other-master.service';




@Component({
  selector: 'app-add-tax-template',
  templateUrl: './add-tax-template.component.html',
  styleUrls: ['./add-tax-template.component.css']
})
export class AddTaxTemplateComponent implements OnInit {
 e;
 
  panelOpenState = true;
  taxItem:any;
  option:any;
  Formula:any;
  carsForm!: FormGroup;
  TaxTemplateName :any;  
   productForm!: FormGroup;
   LoginId:any;
   taxname:any;
   enteredname:any;
   letter:any='A';
  
  
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private fb:FormBuilder,
    private sharedService:SharedService,
    private taxservise:TaxTemplateServiceService,
    private otherMasterService:OtherMasterService,
    ) { 
      this.productForm = this.fb.group({
        DoneBy: this.LoginId,
        TaxTemplateName: '',
        TaxDetails: this.fb.array([]),
        TaxCodeName: '',
        PercentageValue: '',
        Formula: '',
        DisplayOrder: this.letter, 
      });
      }

  ngOnInit(): void {
   
    this.resetSpecialCharacter();
    this.LoginId=localStorage.getItem("logInId");
    this.productForm = this.fb.group({  
      DoneBy:this.LoginId,
      TaxTemplateName:'',  
      TaxDetails: this.fb.array([]) ,  
    }); 
    this.addQuantity(1)
  }
  modelChanged(newObj) {
  alert(newObj)
} 


setUpForm(cars: any[] ) {
    return new FormGroup({
      cars: new FormArray(cars.map((car) => this.createCar(car)))
    });
  }


  closeDialog(){
   
     this.dialogRef.close();

  }
  get carsFormArray() {
    return (this.carsForm.get('FormArray') as FormArray);
  }

   noSpecialCharsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const regex = /^[A-Z]/; 
      if (!regex.test(value)) {
        return { specialChars: true }; 
      }
      return null; 
    };
  }
  
 

  createCar(addformarray: any) {
    return new FormGroup({
      details: new FormGroup({
        taxItem: new FormControl(addformarray.taxItem, Validators.required),
        option: new FormControl(addformarray.option, Validators.required),
        Formula: new FormControl(addformarray.Formula, Validators.required), 
      }),
    })
  }


    
  TaxDetails() : FormArray {  
    return this.productForm.get("TaxDetails") as FormArray  
  }  
     
  newQuantity(data:any): FormGroup {  

    // if(data === 1){
    //   let item=this.letter
    //   item= String.fromCharCode(item.charCodeAt(0));
    //   this.letter=item
    // } else {
    //   let item=this.letter
    //   item= String.fromCharCode(item.charCodeAt(0) + 1);
    //   this.letter=item
    // }
      return this.fb.group({
        TaxCodeName: '',
        PercentageValue: '',
        Formula: '',
        DisplayOrder: this.letter
      });
    
    
  }  
  resetSpecialCharacter() {
     this.letter = this.letter.replace(/[^A-Z]+/gi, '');
  }
  alphabetsOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const regex = /^[A-Z]+$/;
  
      if (!regex.test(value)) {
        return { alphabetsOnly: true };
      }
  
      return null;
    };
  }

  
  showKeyboardArrowDownIcon:boolean=false;
  show:boolean=false;
  Hideddd:boolean=false;
 Arrowmark()
 {
  this.showKeyboardArrowDownIcon=true;
  this.show=true;
 
 }
 
  

  
  
  // addQuantity(data:any) {  
   
  //  this.TaxDetails().push(this.newQuantity(data)); 

  //   this.letter = String.fromCharCode(this.letter.charCodeAt(0) + 1);
   
  //  if (this.letter === 'Z') {
  //    this.letter = 'A'
  // }
  
  // } 
  
  addQuantity(data:any) {
   
      this.TaxDetails().push(this.newQuantity(data));
   
      this.letter = String.fromCharCode(this.letter.charCodeAt(0) + 1);
      this.letter = this.letter.replace(/[^A-Z]+/gi, '');
      if (this.letter === 'Z') {
        this.letter = 'A';
      }
      this.resetSpecialCharacter(); 
  }

  removeQuantity(i: number) {
    this.showKeyboardArrowDownIcon=false;
    this.show=false;
    if (i > 0) {
      this.TaxDetails().removeAt(i);
    }
    this.letter = this.letter.replace(/[^A-Z]+/gi, '');
    this.letter = String.fromCharCode(this.letter.charCodeAt(0) - 1);
    if (this.letter < 'Z') {
      this.letter = 'B';
    }  
    this.resetSpecialCharacter();
  }
     
  onSubmit() { 
 
    this.enteredname=this.taxname;
    console.log(this.productForm.value);  
    this.otherMasterService.filter('Register click');
    console.log('checkarray',this.productForm.value)
    this.taxservise.addtax(this.productForm.value).subscribe((res)=>{
console.log(res)

localStorage.setItem('AddOrEditTax','add');

this.dialog.open(AddtaxTemplateSuccessfulPopupComponent , {panelClass: 'activeSuccessPop'});
this.otherMasterService.filter('Register click');


   this.dialogRef.close();

});

  }  

  
}
