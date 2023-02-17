import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionListService } from 'src/app/services/promotion-list.service';
import { GeographySettingSharedService } from '../services/geography-setting-shared.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-add-geolist-shipping-popup',
  templateUrl: './add-geolist-shipping-popup.component.html',
  styleUrls: ['./add-geolist-shipping-popup.component.css']
})
export class AddGeolistShippingPopupComponent implements OnInit {
  public packingCharges: any[] = [{
    startvalue: '',
    endvalue: '',
    cost: '',
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
  statusArray:any=[];
  userId:any;
  header:any='';
  heading:any='';
  uniqe:any;
  addOrAdit:boolean=true;
  dropdownSettings1: IDropdownSettings = {};
  disabled = false;
  constructor(
     private promotin:PromotionListService,
     private dialogRef: MatDialogRef<AddGeolistShippingPopupComponent>,
     private sharedService:GeographySettingSharedService,
    private user: UserService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    let addOrAdit = localStorage.getItem("addOreditGeoGraphySettings");
    let item=localStorage.getItem('packingChargeOrShipingCharge')
    let uniqe=localStorage.getItem('GeoSettingUniqueKey')
    this.uniqe=localStorage.getItem('GeoSettingUniqueKey')



if(addOrAdit=='edit'){
  this.addOrAdit=false;
  this.heading='Edit Charges'
  if(item=='shippingCharge'){
let Data:any= {
    "uniquekey" :uniqe,
    "CurrentUserId":this.userId,
    "shipping":true               
    }
this.user.editById(Data).subscribe((res)=>{
  console.log(res)
  this.packingCharges=[];
  this.packingCharges=res.response.charges;
  this.myForms = this.fb.group({
    city2: [ res.response.geonames]
  });
  res.response.geonames.forEach(element=>{

    this.productSelected.push(element.geographyId);

  })

})


  }else{
    this.addOrAdit=true;

    let Data:any= {
      "uniquekey" :uniqe,
      "CurrentUserId":this.userId,
      "shipping":false               
      }    
      
    this.user.editById(Data).subscribe((res)=>{
      this.packingCharges=[];
      this.packingCharges=res.response.charges;
      this.myForms = this.fb.group({
        city2: [ res.response.geonames]
      });
      res.response.geonames.forEach(element=>{
    
        this.productSelected.push(element.geographyId);
    
      })    })
    
        }
}else{

  this.heading='Add Charges'

}
    this.userId = localStorage.getItem("logInId");

    this.myForms = this.fb.group({
      city2: [this.selectedItems]
    });
    this.product=new FormControl(this.productLisst);
    this.productSelected = [];
    this.promotionSelected =[];
    this.geographySelected = [];
    this.getGeo()



    if(item=='shippingCharge'){
this.header='Shipping Charge'
    }else{
      this.header='Packing Charge'

    }
  }

  getGeo(){
    this.user.GetGeoDetailsForGeographySettings(this.userId).subscribe((res: any) => {
      this.productLisst = res.response;
      console.log('we have to check here', this.productLisst)
      this.productLisst.forEach(element => {
        return this.statusArray.push(element.geographyId);

      })
      console.log('statusArray', this.statusArray)
      // this.toppingList = res.response;
      this.dropdownSettings1 = {
        singleSelection: false,
        idField: 'geographyId',
        textField: 'geographyName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };

    });
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
      startvalue: '',
      endvalue: '',
      cost: '',
    });
  }
  onProductSelect(item: any) {

    // alert(item.roleName)
      this.productSelected.push(item.geographyId);
    
     console.log('productSelected',this.productSelected)
    }
  
    onProductDeSelect(item: any) {
  
      this.productSelected.forEach((element,index)=>{
        if(element==item.geographyId)  this.productSelected.splice(index,1);
     });
     console.log(' this.userTypes', this.userTypes)
    
      // this.userTypes.pop(item.roleId);
      console.log('productSelected',this.productSelected)


    }
    onItemDeSelectOrAllProduct(item:any){
      this.productSelected =[];
   
      console.log('productSelected',this.productSelected)

  }
  finalAddVAlue(){


    let item=localStorage.getItem('packingChargeOrShipingCharge')

    if(item=='shippingCharge'){

      let data:any= {
        "geographyids":this.productSelected,
        "CurrentUserId":this.userId,
        "AddCharges":this.packingCharges
    }
  
  this.user.addStockPrice(data).subscribe((res)=>{
  if(res.response.result=='Successfully shipping charges added'){
    alert('Successfully shipping charges added');
    this.sharedService.filter('Register click');
    this.dialogRef.close();

  }else{
    alert('Enter all the values')
  }
  
  })
    console.log('packingCharges',this.packingCharges)
      }else{

        let data:any= {
          "geographyids":this.productSelected,
          "CurrentUserId":this.userId,
          "AddCharges":this.packingCharges
      }
    
    this.user.addPackingCharge(data).subscribe((res)=>{
    if(res.response.result=='Successfully packing charges added'){
      alert('Successfully packing charges added');
      this.sharedService.filter('Register click');
      this.dialogRef.close();

    }else{
      alert('Enter all the values')
    }
    
    })
      console.log('packingCharges',this.packingCharges)
    
    }

}

finalAddVAlue1(){


  let item=localStorage.getItem('packingChargeOrShipingCharge')

  if(item=='shippingCharge'){

    let data:any= {
    'uniquekey':  this.uniqe,
      "geographyids":this.productSelected,
      "CurrentUserId":this.userId,
      "AddCharges":this.packingCharges
  }

this.user.UpdateStockPrice(data).subscribe((res)=>{
if(res.response.result=='succesfully updated'){
  alert('succesfully updated');
  this.sharedService.filter('Register click');
  this.dialogRef.close();

}else{
  alert('Enter all the values')
}

})
  console.log('packingCharges',this.packingCharges)
    }else{

      let data:any= {
        "geographyids":this.productSelected,
        "CurrentUserId":this.userId,
        "AddCharges":this.packingCharges
    }
  
  this.user.UpdatePackingCharge(data).subscribe((res)=>{
  if(res.response.result=='succesfully updated'){
    alert('succesfully updated');
    this.sharedService.filter('Register click');
    this.dialogRef.close();

  }else{
    alert('Enter all the values')
  }
  
  })
    console.log('packingCharges',this.packingCharges)
  
  }

}
  onItemSelectOrAllProduct(item:any){
    this.productSelected=this.statusArray;
    console.log('productSelected',this.productSelected)

}

}


