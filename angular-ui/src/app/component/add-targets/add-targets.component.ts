import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TargetListService } from 'src/app/services/target-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-targets',
  templateUrl: './add-targets.component.html',
  styleUrls: ['./add-targets.component.css']
})
export class AddTargetsComponent implements OnInit {
  image1 = 'assets/img/minimize-tag.png';
  rowsTotal: boolean = false;
  disableColumns: boolean = false;
  anuallySelected: boolean = false;
  allDlrSelected:boolean = false;
  targetListData:any = [];
  targetId:any = [];
  selectedItems: any = [];
  disabled = false;
  dealerListData:any = [];
  dealerlist:any = [];
  dealerAllarray:any = [];
  geographyList:any = [];
  geographyListData:any = [];
  geographyArray:any = [];
  productCount:any;
  dealerSelect:any = [];
  dealerSelectedName:any = [];
  dealerAllName:any = [];
  dealer:any = FormGroup;
  geoForm:any = FormGroup;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  geographyNameArray:any = [];
  geographySelected:any = [];
  geographySelectedName:any = [];
  janValue:any;
  febValue:any;
  marValue:any;
  aprlValue:any;
  mayValue:any;
  juneValue:any;
  julyValue:any;
  augValue:any;
  septValue:any;
  octValue:any;
  novValue:any;
  decValue:any;
  totalValue:any;
  janUnitValue:any;
  febUnitValue:any;
  marUnitValue:any;
  aprlUnitValue:any;
  mayUnitValue:any;
  juneUnitValue:any;
  julyUnitValue:any;
  augUnitValue:any;
  septUnitValue:any;
  octUnitValue:any;
  novUnitValue:any;
  decUnitValue:any;
  totalUnitValue:any;
  financialYear:any;
  targetSelected:any;
  addedTargetData:any;
  ProductCount:any;
  userId:any;
  constructor(
    private targetList: TargetListService,
    private fb: FormBuilder,
    private user: UserService,
  ) { }
  ngOnInit(): void {
    this.targetListGroup();
    this.dealer = this.fb.group({
      dealer: [this.selectedItems]
    });
    this.geoForm = this.fb.group({
      geoForm: [this.selectedItems]
    });
    this.dealerOrder();
    this.Geography();
    this.userId = localStorage.getItem("logInId");
  }
  onSelectFinancialYear(event:any){
this.financialYear =event.target.value;
  }
  onSelectTarget(event: any) {
    this.targetSelected = event.target.value;
    let data = event.target.value;
    if (data == "Quaterly") {
      this.disableColumns = true;
      this.anuallySelected = false;
    }
    if (data == "Monthly") {
      this.disableColumns = false;
      this.anuallySelected = false;
    }
    if (data == "Annually") {
      this.disableColumns = false;
      this.anuallySelected = true;
    }
    console.log("TargetSelected",this.targetSelected )
  }
  expandTotalRows() {
    this.rowsTotal = !this.rowsTotal;

    if (this.rowsTotal === false) {
      this.image1 = 'assets/img/minimize-tag.png';
    } else {
      this.image1 = 'assets/img/maximize-arrow.png';

    }
  }
  allDealerSelected(){
    this.allDlrSelected = !this.allDlrSelected;
  }
  targetListGroup(){
    this.targetList.getTargetList().subscribe((res) => {
      this.targetListData  = res.response;
    console.log("check target",this.targetListData );
    })
  }
  onTargetGrpSelect(item: any) {
    this.targetId = item.targetGroupId;
        this.targetList.productCountAccordingToDealer(this.targetId).subscribe((res) => {
      this.productCount  = res.response.totalProductSelectedGroup;
    console.log("check Product Count ",this.productCount);
    })
  }
  // geographyDropdown
  dealerOrder(){
    this.user.dealerDropdownOrderlist().subscribe((res: any) => {
        this.dealerListData = res.response;
        let localdata = this.dealerListData;
        this.dealerlist = localdata.map((data: { customerId: any; customerName: any; }) => {
          return { customerId: data.customerId, customerName  : data.customerName };
        });
        this.dealerlist.push()
        this.dealerlist.forEach(element => {
          return this.dealerAllarray.push(element.customerId);
        })    
        this.dealerlist.forEach(element => {
          return this.dealerAllName.push(element.customerName);
        })     
        console.log('dealerAllarray',this.dealerAllarray)                                                    
      });
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'customerId',
        textField: 'customerName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };
  }
  Geography() {
    // this.targetList.geographyDropdown(this.targetId).subscribe((res) => {
    //   this.geographyList = res.response.totalProductSelectedGroup;
    // console.log("check Product Count ",this.productCount);
    // })
    // this.user.getGographicDropdown().subscribe((res: any) => {
    //   this.geographyList = res.response;
    //   let localdata = this.geographyList;
    //   this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
    //     return { geographyId: data.geographyId, geographyName: data.geographyName };
    //   });
    //   this.geographyListData.push()
    //   this.geographyListData.forEach(element => {
    //     return this.geographyArray.push(element.geographyId);
    //   })
    //   console.log('rolearray', this.geographyArray)              
    // });
    this.dropdownSettings1= {
      singleSelection: false,
      idField: 'geographyId',
      textField: 'geographyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }
  onDealerItemSelect(item: any) {
this.dealerSelect.push(item.customerId);
this.dealerSelectedName.push(item.customerName);
let datas = {
  customerId:this.dealerSelect
}
console.log("Datas",datas)
  this.targetList.geographyDropdown(datas).subscribe((res) => {
    this.geographyList = res.response;
  console.log("check Geography ",this.geographyList);
  })
        let localdata = this.geographyList;
      this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      this.geographyListData.push()
      this.geographyListData.forEach(element => {
        return this.geographyArray.push(element.geographyId);
      })
      this.geographyListData.forEach(element => {
        return this.geographyNameArray.push(element.geographyName);
      })
      // this.geoForm = this.fb.group({
      //   geoForm: [this.selectedItems]
      // });
  }
  onDealerItemSelectOrAll(item: any) {
    this.dealerSelect = this.dealerAllarray;
    this.dealerSelectedName = this.dealerAllName;
    let datas = {
      customerId:this.dealerSelect
    }
    console.log("Datas",datas)
      this.targetList.geographyDropdown(datas).subscribe((res) => {
        this.geographyList = res.response;
      console.log("check Geography ",this.geographyList);
      })
      let localdata = this.geographyList;
      this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      this.geographyListData.push()
      this.geographyListData.forEach(element => {
        return this.geographyArray.push(element.geographyId);
      })
      this.geographyListData.forEach(element => {
        return this.geographyNameArray.push(element.geographyName);
      })
      this.geoForm = this.fb.group({
        geoForm: [this.selectedItems]
      });
  }
  onDealerItemDeSelectOrAll(item: any) {
    this.dealerSelect = [];
    this.dealerSelectedName = [];
    let datas = {
      customerId:this.dealerSelect
    }
    console.log("Datas",datas)
      this.targetList.geographyDropdown(datas).subscribe((res) => {
        this.geographyList = res.response;
      console.log("check Geography ",this.geographyList);
      })
      let localdata = this.geographyList;
      this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      this.geographyListData.push()
      this.geographyListData.forEach(element => {
        return this.geographyArray.push(element.geographyId);
      })
      this.geographyListData.forEach(element => {
        return this.geographyNameArray.push(element.geographyName);
      })
      this.geoForm = this.fb.group({
        geoForm: [this.selectedItems]
      });
  }
  onDealerItemDeSelect(item: any) {

    this.dealerSelect.forEach((element, index) => {
      if (element == item.customerId) this.dealerSelect.splice(index, 1);
    });
    this.dealerSelectedName.forEach((element, index) => {
      if (element == item.customerName) this.dealerSelect.splice(index, 1);
    });
    let datas = {
      customerId:this.dealerSelect
    }
    console.log("Datas",datas)
      this.targetList.geographyDropdown(datas).subscribe((res) => {
        this.geographyList = res.response;
      console.log("check Geography ",this.geographyList);
      })
      let localdata = this.geographyList;
      this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      this.geographyListData.push()
      this.geographyListData.forEach(element => {
        return this.geographyArray.push(element.geographyId);
      })
      this.geographyListData.forEach(element => {
        return this.geographyNameArray.push(element.geographyName);
      })
      this.geoForm = this.fb.group({
        geoForm: [this.selectedItems]
      });
  }
  onGeographyItemSelect(item: any) {
    this.geographySelected.push(item.geographyId);
    this.geographySelectedName.push(item.geographyName);
    console.log("GeographyId",this.geographySelected);
    console.log("GeographyName",this.geographySelectedName);
    if(this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
     this.getproductCount();
    }
  }
  onGeographyItemSelectOrAll(item: any) {
    this.geographySelected = this.geographyArray;
    this.geographySelectedName = this.geographyNameArray;
    console.log("GeographyId",this.geographySelected);
    console.log("GeographyName",this.geographySelectedName);
    if(this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
      this.getproductCount();
     }
  }
  onGeographyItemDeSelectOrAll(item: any) {
    this.geographySelected = [];
    this.geographySelectedName = [];
    console.log("GeographyId",this.geographySelected);
    console.log("GeographyName",this.geographySelectedName);
    if(this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
      this.getproductCount();
     }
  }
  onGeographyItemDeSelect(item: any) {

    this.geographySelected.forEach((element, index) => {
      if (element == item.geographyId) this.geographySelected.splice(index, 1);
    });
    this.geographySelectedName.forEach((element, index) => {
      if (element == item.geographyName) this.geographySelectedName.splice(index, 1);
    });
    console.log("GeographyId",this.geographySelected);
    console.log("GeographyName",this.geographySelectedName);
    if(this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
      this.getproductCount();
     }
  }
  janUnit(event:any){
    this.janUnitValue =event.target.value;
    console.log("janUnit",this.janUnitValue);
  }
  febUnit(event:any){
    this.febUnitValue =event.target.value;
    console.log("febUnit",this.febUnitValue);
  }
  marUnit(event:any){
    this.marUnitValue =event.target.value;
    console.log("marUnit",this.marUnitValue);
  }
  aprlUnit(event:any){
    this.aprlUnitValue =event.target.value;
    console.log("aprlUnit",this.aprlUnitValue);
  }
  mayUnit(event:any){
    this.mayUnitValue =event.target.value;
    console.log("mayUnit",this.mayUnitValue);
  }
  juneUnit(event:any){
    this.juneUnitValue =event.target.value;
    console.log("juneUnit",this.juneUnitValue);
  }
  julyUnit(event:any){
    this.julyUnitValue =event.target.value;
    console.log("julyUnit",this.julyUnitValue);
  }
  augUnit(event:any){
    this.augUnitValue =event.target.value;
    console.log("augUnit",this.augUnitValue);
  }
  septUnit(event:any){
    this.septUnitValue =event.target.value;
    console.log("septUnit",this.septUnitValue);
  }
  octUnit(event:any){
    this.octUnitValue =event.target.value;
    console.log("octUnit",this.octUnitValue);
  }
  novUnit(event:any){
    this.novUnitValue =event.target.value;
    console.log("novUnit",this.novUnitValue);
  }
  decUnit(event:any){
    this.decUnitValue =event.target.value;
    console.log("decUnit",this.decUnitValue);
  }
  totalUnit(event:any){
    this.totalUnitValue =event.target.value;
    console.log("totalUnit",this.totalUnitValue);
  }
  jan(event:any){
    this.janValue =event.target.value;
    console.log("JAnVAlue",this.janValue);
  }
  feb(event:any){
    this.febValue =event.target.value;
    console.log("febVAlue",this.febValue);
  }
  mar(event:any){
    this.marValue =event.target.value;
    console.log("marVAlue",this.marValue);
  }
  aprl(event:any){
    this.aprlValue =event.target.value;
    console.log("aprlVAlue",this.aprlValue);
  }
  may(event:any){
    this.mayValue =event.target.value;
    console.log("mayVAlue",this.mayValue);
  }
  june(event:any){
    this.juneValue =event.target.value;
    console.log("juneVAlue",this.juneValue);
  }
  july(event:any){
    this.julyValue =event.target.value;
    console.log("julyVAlue",this.julyValue);
  }
  aug(event:any){
    this.augValue =event.target.value;
    console.log("augVAlue",this.augValue);
  }
  sept(event:any){
    this.septValue =event.target.value;
    console.log("septVAlue",this.septValue);
  }
  oct(event:any){
    this.octValue =event.target.value;
    console.log("octVAlue",this.octValue);
  }
  nov(event:any){
    this.novValue =event.target.value;
    console.log("novVAlue",this.novValue);
  }
  dec(event:any){
    this.decValue =event.target.value;
    console.log("decVAlue",this.decValue);
  }
  TotalValue(event:any){
    this.totalValue =event.target.value;
    console.log("totalVAlue",this.totalValue);
  }
  saveTargetData(){
    // this.dealerSelectedName.forEach((element, index) => {
    //   if (element == item.customerName) this.dealerSelect.splice(index, 1);
    // });
    let data = {
      TargetGroupId:this.targetId,
      CustomerId:this.dealerSelect,
      GeographyId:this.geographySelected,
      ProductCount:20,
      year:this.financialYear,
      setTarget:this.targetSelected,
      volume:{
          jan:this.janValue,
          feb:this.febValue,
            mar:this.marValue,
              apr:this.aprlValue,
                
                  may:this.mayValue,
                  jun:this.juneValue,
                  jul:this.julyValue,
                    aug:this.augValue,
                    sep:this.septValue,
              oct:this.octValue,
                
                  nov:this.novValue,
                  dec:this.decValue
                 
      },
      units:{
          jan:this.janUnitValue,
          feb:this.febUnitValue,
            mar:this.marUnitValue,
              apr:this.aprlUnitValue,
                
                  may:this.mayUnitValue,
                  jun:this.juneUnitValue,
                  jul:this.julyUnitValue,
                    aug:this.augUnitValue,
                    sep:this.septUnitValue,
              oct:this.octUnitValue,
                
                  nov:this.novUnitValue,
                  dec:this.decUnitValue
      },
      vtotal:this.totalValue,
      utotal:this.totalUnitValue,
      CreatedById:this.userId
    }
    this.targetList.addTargetData(data).subscribe((res) => {
      this.addedTargetData = res.response;
    console.log("Added TargetData ",this.addedTargetData);
    })
  }
  getproductCount() {
    let data = {
      TargetGroupId:this.targetId,
      GeographyId:this.geographySelected,
      Customerid:this.dealerSelect
    }
    console.log("DAta",data)
    this.targetList.getProductCount(data).subscribe((res) => {
      this.ProductCount = res.response;
    console.log("this.ProductCount ",this.ProductCount);
    })
  }
}
