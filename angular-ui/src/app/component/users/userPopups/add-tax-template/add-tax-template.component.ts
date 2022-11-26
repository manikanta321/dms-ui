import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { TaxTemplateServiceService } from 'src/app/services/tax-template-service.service';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-add-tax-template',
  templateUrl: './add-tax-template.component.html',
  styleUrls: ['./add-tax-template.component.css']
})
export class AddTaxTemplateComponent implements OnInit {
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
    private fb:FormBuilder,
    private sharedService:SharedService,
    private taxservise:TaxTemplateServiceService,
    ) { 
      }

  ngOnInit(): void {
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


 

  createCar(addformarray: any) {
    return new FormGroup({
      details: new FormGroup({
        taxItem: new FormControl(addformarray.taxItem, Validators.required),
        option: new FormControl(addformarray.option, Validators.required),
        Formula: new FormControl(addformarray.Formula, Validators.required)
      }),
    })
  }


    
  TaxDetails() : FormArray {  
    return this.productForm.get("TaxDetails") as FormArray  
  }  
     
  newQuantity(data:any): FormGroup {  

    if(data === 1){
      let item=this.letter
      item= String.fromCharCode(item.charCodeAt(0));
      this.letter=item
    } else {
      let item=this.letter
      item= String.fromCharCode(item.charCodeAt(0) + 1);
      this.letter=item
    }
   

    return this.fb.group({  
      TaxCodeName: '',  
      PercentageValue: '',  
      Formula:'',
      DisplayOrder:this.letter,
    })  
  }  
     
  addQuantity(data:any) {  
   this.TaxDetails().push(this.newQuantity(data));  
  }  

  removeQuantity(i:number) {  
    if(i>0){
      this.TaxDetails().removeAt(i);  
    }
  }  
     
  onSubmit() { 
    this.enteredname=this.taxname;
    console.log(this.productForm.value);  

    console.log('checkarray',this.productForm.value)
    this.taxservise.addtax(this.productForm.value).subscribe((res)=>{
console.log(res)
this.sharedService.filter('Register click')

this.dialogRef.close();

    })
  }  


}
