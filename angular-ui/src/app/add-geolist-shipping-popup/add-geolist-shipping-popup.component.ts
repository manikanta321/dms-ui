import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionListService } from 'src/app/services/promotion-list.service';
@Component({
  selector: 'app-add-geolist-shipping-popup',
  templateUrl: './add-geolist-shipping-popup.component.html',
  styleUrls: ['./add-geolist-shipping-popup.component.css']
})
export class AddGeolistShippingPopupComponent implements OnInit {
  public packingCharges: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  errorMsg: any;
  addCountryButton: boolean = false;
  removelist: boolean = false;
  stateName: string[] = ['State 1', 'State 2',];
  productLisst:  any= [];
  product=new FormControl('');
  productSelected:any[]=[];
  promotionSelected:any[]=[];
  geographySelected:any[]=[];
  public rowData5=[];
  userTypes:any=[];
  productarray:any[]=[];
  myForms:any= FormGroup;
  selectedItems: any = [];
  dropdownSettings1: IDropdownSettings = {};
  disabled = false;
  constructor( private promotin:PromotionListService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.myForms = this.fb.group({
      city2: [this.selectedItems]
    });
    this.product=new FormControl(this.productLisst);
    this.productSelected = [];
    this.promotionSelected =[];
    this.geographySelected = [];
  }
  addCountry() {
    this.addCountryButton = true;
  }
  removesub(uId: number) {
    const index = this.packingCharges.findIndex((address) => address.id === uId);
    this.packingCharges.splice(index, 1); 
  }
  addFields() {
    this.packingCharges.push({
      sValue: '',
      eValue: '',
      pValue: '',
    });
  }
  onProductSelect(item: any) {

    // alert(item.roleName)
      this.productSelected.push(item.productGroupId);
    
      const data={
        promotiontype:this.promotionSelected,
        product:this.productSelected,
        geography:this.geographySelected,
       
  
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {
  
        this.rowData5 = res.response;
  
       
       
  
      });
     
    }
  
    onProductDeSelect(item: any) {
  
      this.productSelected.forEach((element,index)=>{
        if(element==item.productGroupId)  this.productSelected.splice(index,1);
     });
     console.log(' this.userTypes', this.userTypes)
    
      // this.userTypes.pop(item.roleId);
      const data={
        promotiontype:this.promotionSelected,
        product:this.productSelected,
        geography:this.geographySelected,
         
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {
  
        this.rowData5 = res.response;
       
  
      });
    
    }
    onItemDeSelectOrAllProduct(item:any){
      this.productSelected =[];
      const data={
        promotiontype:this.promotionSelected,
        product:this.productSelected,
        geography:this.geographySelected,
       
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {

        this.rowData5 = res.response;
       
  
      });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemSelectOrAllProduct(item:any){
    this.productSelected=this.productarray;
   
    const data={
      promotiontype:this.promotionSelected,
      product:this.productSelected,
      geography:this.geographySelected,
          }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
     

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);}
}

  


