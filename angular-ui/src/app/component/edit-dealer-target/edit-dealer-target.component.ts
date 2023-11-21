import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DealerTargetPopupGridComponent } from 'src/app/dealer-target-popup-grid/dealer-target-popup-grid.component';
import { DealerTargetSuccessPopupComponent } from 'src/app/dealer-target-success-popup/dealer-target-success-popup.component';
import { DealerTargetSharedServicesService } from 'src/app/services/dealer-target-shared-services.service';
import { TargetListService } from 'src/app/services/target-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-dealer-target',
  templateUrl: './edit-dealer-target.component.html',
  styleUrls: ['./edit-dealer-target.component.css']
})
export class EditDealerTargetComponent implements OnInit {
  image1 = 'assets/img/minimize-tag.png';
  rowsTotal: boolean = false;
  disableColumns: boolean = false;
  anuallySelected: boolean = false;
  allDlrSelected: boolean = false;
  allDlrSelected1: boolean = false;
  targetListData: any = [];
  targetId: any;
  selectedItems: any = [];
  disabled = false;
  dealerListData: any = [];
  dealerlist: any = [];
  dealerAllarray: any = [];
  geographyList: any = [];
  geographyListData: any = [];
  geographyArray: any = [];
  productCount: any;
  dealerSelect: any = [];
  dealerSelectedName: any = [];
  dealerAllName: any = [];
  dealer: any = FormGroup;
  geoForm: any = FormGroup;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  geographyNameArray: any = [];
  geographySelected: any = [];
  geographySelectedName: any = [];
  janValue: any;
  febValue: any;
  marValue: any;
  aprlValue: any;
  mayValue: any;
  juneValue: any;
  julyValue: any;
  augValue: any;
  septValue: any;
  octValue: any;
  novValue: any;
  decValue: any;
  totalValue: any;
  janUnitValue: any;
  febUnitValue: any;
  marUnitValue: any;
  aprlUnitValue: any;
  mayUnitValue: any;
  juneUnitValue: any;
  julyUnitValue: any;
  augUnitValue: any;
  septUnitValue: any;
  octUnitValue: any;
  novUnitValue: any;
  decUnitValue: any;
  totalUnitValue: any;
  financialYear: any;
  targetSelected: any;
  addedTargetData: any;
  ProductCount: any;
  dealersArray: any = [];
  selectedDealer: any = [];
  TargetAssociationId:any;
  LoginId:any;
  dealerTargetSetItem:any;
  dealerTargetaddorderdit:any;
  targetGroupId:any;
  mainadd: any = [{
  }]



  userId: any;
  constructor(
    private targetList: TargetListService,
    private fb: FormBuilder,
    private user: UserService,
    private dialogRef: MatDialogRef<EditDealerTargetComponent>,
    private sharedService: DealerTargetSharedServicesService,
    public dialog: MatDialog,

  ) {

  }
  ngOnInit(): void {

  
    this.LoginId=localStorage.getItem("logInId");

    let id = localStorage.getItem('editOrAddTarget');
    this.TargetAssociationId=id;
    this.dealerTargetSetItem=localStorage.getItem('dealerTargetSetItem')
    this.dealerTargetaddorderdit=localStorage.getItem('dealerTargetaddorderdit');

    let data = {
      "TargetAssociationId":Number(id),
      "CurrentUserId":this.LoginId
    }
    
 
    this.targetList.getTargetById(data).subscribe((res) => {
      console.log(res.response);
      
      this.targetId = res.response.targetGroupId;
      localStorage.setItem("targetId", this.targetId)
      this.productCount = res.response.productCount;
      this.mainadd[0].geography = [];
      this.targetGroupId=res.response.targetGroupId
      this.mainadd[0].targetGroupId = res.response.targetGroupId;
      this.mainadd[0].targetGroupName = res.response.targetGroupName;
      this.mainadd[0].customerId = res.response.customerId;
      this.mainadd[0].customerName = res.response.customerName;

      this.mainadd[0].CreatedById = this.userId;

      let geographyobj: any = {}
      let geographyobj1: any = []

        geographyobj.geographyId = res.response.geographyid;

        geographyobj.geographyName = res.response.geographyName;

        geographyobj.productCount = res.response.productCount;

        geographyobj.year = res.response.year;

geographyobj.utotal=res.response.utotal
geographyobj.vtotal  =res.response.vtotal
        geographyobj.settarget = res.response.settarget;

        let mainobj: any = [];

        let mainobj1: any = {}

          // mainobj1.targetMonthNo = element.settarget;
            mainobj1.targetValue = res.response.volume;
            mainobj1.targetUnit = res.response.units;
            mainobj.push(mainobj1)
            geographyobj.targets=mainobj;
           this.mainadd[0].geography= [geographyobj];
           if (res.response.settarget == "Quaterly") {
            this.disableColumns = true;
            this.anuallySelected = false;
          }
          if (res.response.settarget == "Monthly") {
            this.disableColumns = false;
            this.anuallySelected = false;
          }
          if (res.response.settarget == "Annualy") {
            this.disableColumns = false;
            this.anuallySelected = true;
          }
      });
      


      console.log('object for edit', this.mainadd[0])


    console.log('mainadd', this.mainadd)
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
  onSelectFinancialYear(event: any) {
    // alert(event.target.value)
    this.mainadd[0].geography[0].year = event.target.value;
  }

  productPopup() {
    this.dialog.open(DealerTargetPopupGridComponent,  { panelClass: 'psubgrid-popup' }) 
   
  }
  
  onSelectTarget(event: any) {
    this.mainadd[0].geography[0].utotal = this.mainadd[0].geography[0].targets[0].targetUnit.jan = this.mainadd[0].geography[0].targets[0].targetUnit.feb =this.mainadd[0].geography[0].targets[0].targetUnit.mar=this.mainadd[0].geography[0].targets[0].targetUnit.apr = this.mainadd[0].geography[0].targets[0].targetUnit.may =this.mainadd[0].geography[0].targets[0].targetUnit.june =this.mainadd[0].geography[0].targets[0].targetUnit.july = this.mainadd[0].geography[0].targets[0].targetUnit.aug = this.mainadd[0].geography[0].targets[0].targetUnit.sep =this.mainadd[0].geography[0].targets[0].targetUnit.oct =this.mainadd[0].geography[0].targets[0].targetUnit.nov =this.mainadd[0].geography[0].targets[0].targetUnit.dec=0
    this.mainadd[0].geography[0].vtotal = this.mainadd[0].geography[0].targets[0].targetValue.jan = this.mainadd[0].geography[0].targets[0].targetValue.feb =this.mainadd[0].geography[0].targets[0].targetValue.mar=this.mainadd[0].geography[0].targets[0].targetValue.apr = this.mainadd[0].geography[0].targets[0].targetValue.may =this.mainadd[0].geography[0].targets[0].targetValue.june =this.mainadd[0].geography[0].targets[0].targetValue.july = this.mainadd[0].geography[0].targets[0].targetValue.aug = this.mainadd[0].geography[0].targets[0].targetValue.sep =this.mainadd[0].geography[0].targets[0].targetValue.oct =this.mainadd[0].geography[0].targets[0].targetValue.nov =this.mainadd[0].geography[0].targets[0].targetValue.dec=0

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
    if (data == "Annualy") {
      this.disableColumns = false;
      this.anuallySelected = true;
    }
    console.log("TargetSelected", this.targetSelected)
  }
  expandTotalRows() {
    this.rowsTotal = !this.rowsTotal;

    if (this.rowsTotal === false) {
      this.image1 = 'assets/img/minimize-tag.png';
    } else {
      this.image1 = 'assets/img/maximize-arrow.png';

    }
  }
  allDealerSelected() {
    this.allDlrSelected = !this.allDlrSelected;
    if (this.allDlrSelected == true) {
      this.selectedDealer = this.dealersArray
      this.allDlrSelected1 = true;
      this.allDlrSelected1 = !this.allDlrSelected1;

    }
    else {
      this.selectedDealer = [];
    }
  }


  custmer1(id) {
    this.allDlrSelected1 = !this.allDlrSelected1
    if (this.allDlrSelected1 == true) {


      const index = this.selectedDealer.indexOf(id);

      if (index !== -1) {
        this.selectedDealer.splice(index, 1);
      }
      else {
        this.selectedDealer.push(id);

      }



    }
    else {



      const index = this.selectedDealer.indexOf(id);

      if (index !== -1) {
        this.selectedDealer.splice(index, 1);
      }
      else {
        this.selectedDealer.push(id);

      }

    }


    console.log('selectedDealer', this.selectedDealer)
  }

  targetListGroup() {
    this.targetList.getTargetList().subscribe((res) => {
      this.targetListData = res.response;
      console.log("check target", this.targetListData);
    })
  }
  onTargetGrpSelect(item: any) {
    this.targetId = item.targetGroupId;
    localStorage.setItem("targetId", this.targetId)
    this.targetList.productCountAccordingToDealer(this.targetId).subscribe((res) => {
      this.productCount = res.response.totalProductSelectedGroup;
      console.log("check Product Count ", this.productCount);
     
    })
  }
  // geographyDropdown
  dealerOrder() {
    this.user.dealerDropdownOrderlist1().subscribe((res: any) => {
      this.dealerListData = res.response;
      let localdata = this.dealerListData;
      this.dealerlist = localdata.map((data: { customerId: any; customerName: any; }) => {
        return { customerId: data.customerId, customerName: data.customerName };
      });
      this.dealerlist.push()
      this.dealerlist.forEach(element => {
        return this.dealerAllarray.push(element.customerId);
      })
      this.dealerlist.forEach(element => {
        return this.dealerAllName.push(element.customerName);
      })
      console.log('dealerAllarray', this.dealerAllarray)
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
    this.dropdownSettings1 = {
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
      customerId: this.dealerSelect
    }
    console.log("Datas", datas)
    this.targetList.geographyDropdown(datas).subscribe((res) => {
      this.geographyList = res.response;
      console.log("check Geography ", this.geographyList);
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
      customerId: this.dealerSelect
    }
    console.log("Datas", datas)
    this.targetList.geographyDropdown(datas).subscribe((res) => {
      this.geographyList = res.response;
      console.log("check Geography ", this.geographyList);
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
      customerId: this.dealerSelect
    }
    console.log("Datas", datas)
    this.targetList.geographyDropdown(datas).subscribe((res) => {
      this.geographyList = res.response;
      console.log("check Geography ", this.geographyList);
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
      customerId: this.dealerSelect
    }
    console.log("Datas", datas)
    this.targetList.geographyDropdown(datas).subscribe((res) => {
      this.geographyList = res.response;
      console.log("check Geography ", this.geographyList);
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
    console.log("GeographyId", this.geographySelected);
    console.log("GeographyName", this.geographySelectedName);
    if (this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
      this.getproductCount();
    }



    let data = {
      TargetGroupId: this.targetId,
      GeographyId: this.geographySelected,
      Customerid: this.dealerSelect,
    }

    this.targetList.getDealerDetails(data).subscribe((res) => {
      this.objectDesign(res.response)
    })

  }

  objectDesign(data) {
    this.mainadd[0].dealers = []
    this.mainadd[0].TargetGroupId = this.targetId;
    this.mainadd[0].CreatedById = this.userId;

    this.mainadd[0].dealers.forEach(element => {
      this.dealersArray.push(element.CustomerId)
    })


    data.forEach(element => {
      let arrayOfGeo: any = []
      element.geos.forEach(element1 => {
        let objgeo: any = {
          GeographyId: element1.geographyId,
          GeographyName: element1.geographyName,
          ProductCount: element1.productcount,
          year: '',
          setTarget: '',
          volume: {

            jan: '',
            feb: '',
            mar: '',
            apr: '',

            may: '',
            jun: '',
            jul: '',
            aug: '',
            sep: '',
            oct: '',

            nov: '',
            dec: '',
          },
          units: {

            jan: '',
            feb: '',
            mar: '',
            apr: '',

            may: '',
            jun: '',
            jul: '',
            aug: '',
            sep: '',
            oct: '',

            nov: '',
            dec: '',
          },
          vtotal: '',
          utotal: '',
        }
        arrayOfGeo.push(objgeo)

      })


      let obj: any = {
        CustomerId: element.customerid,
        CustomerName: element.customername,
        targets: arrayOfGeo,
      }
      this.mainadd[0].dealers.push(obj)

      console.log('msinobjworkingOrNot', this.mainadd)
    });


  }

  onGeographyItemSelectOrAll(item: any) {
    this.geographySelected = this.geographyArray;
    this.geographySelectedName = this.geographyNameArray;
    console.log("GeographyId", this.geographySelected);
    console.log("GeographyName", this.geographySelectedName);
    if (this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
      this.getproductCount();
    }



    let data = {
      TargetGroupId: this.targetId,
      GeographyId: this.geographySelected,
      Customerid: this.dealerSelect,
    }

    this.targetList.getDealerDetails(data).subscribe((res) => {
      this.objectDesign(res.response)
    })
  }
  onGeographyItemDeSelectOrAll(item: any) {
    this.geographySelected = [];
    this.geographySelectedName = [];
    console.log("GeographyId", this.geographySelected);
    console.log("GeographyName", this.geographySelectedName);
    if (this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
      this.getproductCount();
    }



    let data = {
      TargetGroupId: this.targetId,
      GeographyId: this.geographySelected,
      Customerid: this.dealerSelect,
    }

    this.targetList.getDealerDetails(data).subscribe((res) => {
      this.objectDesign(res.response)
    })
  }
  onGeographyItemDeSelect(item: any) {

    this.geographySelected.forEach((element, index) => {
      if (element == item.geographyId) this.geographySelected.splice(index, 1);
    });
    this.geographySelectedName.forEach((element, index) => {
      if (element == item.geographyName) this.geographySelectedName.splice(index, 1);
    });
    console.log("GeographyId", this.geographySelected);
    console.log("GeographyName", this.geographySelectedName);
    if (this.targetId != '' && this.dealerSelect != '' && this.geographySelected != '') {
      this.getproductCount();
    }



    let data = {
      TargetGroupId: this.targetId,
      GeographyId: this.geographySelected,
      Customerid: this.dealerSelect,
    }

    this.targetList.getDealerDetails(data).subscribe((res) => {
      this.objectDesign(res.response)
    })
  }
  janUnit(event: any, i, j) {
    //  this.mainadd[0].dealers[i].targets[j].units.jan + this.mainadd[0].dealers[i].targets[j].units.feb
    this.mainadd[0].geography[0].utotal = Number(this.mainadd[0].geography[0].targets[0].targetUnit.jan) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.feb) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.mar) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.apr) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.may) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.june) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.july) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.aug) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.sep) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.oct) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.nov) + Number(this.mainadd[0].geography[0].targets[0].targetUnit.dec)
    // alert(this.mainadd[0].dealers[i].targets[j].units)

    // this.janUnitValue =event.target.value;
    console.log("janUnit", this.janUnitValue);
  }


  janUnit1(event: any, i, j) {
    this.mainadd[0].geography[0].vtotal = Number(this.mainadd[0].geography[0].targets[0].targetValue.jan) + Number(this.mainadd[0].geography[0].targets[0].targetValue.feb) + Number(this.mainadd[0].geography[0].targets[0].targetValue.mar) + Number(this.mainadd[0].geography[0].targets[0].targetValue.apr) + Number(this.mainadd[0].geography[0].targets[0].targetValue.may) + Number(this.mainadd[0].geography[0].targets[0].targetValue.june) + Number(this.mainadd[0].geography[0].targets[0].targetValue.july) + Number(this.mainadd[0].geography[0].targets[0].targetValue.aug) + Number(this.mainadd[0].geography[0].targets[0].targetValue.sep) + Number(this.mainadd[0].geography[0].targets[0].targetValue.oct) + Number(this.mainadd[0].geography[0].targets[0].targetValue.nov) + Number(this.mainadd[0].geography[0].targets[0].targetValue.dec)
    // alert(this.mainadd[0].dealers[i].targets[j].units)
    
    // this.janUnitValue =event.target.value;
    console.log("janUnit", this.janUnitValue);
  }
  custmer() {

  }
  febUnit(event: any) {
    this.febUnitValue = event.target.value;
    console.log("febUnit", this.febUnitValue);
  }
  marUnit(event: any) {
    this.marUnitValue = event.target.value;
    console.log("marUnit", this.marUnitValue);
  }
  aprlUnit(event: any) {
    this.aprlUnitValue = event.target.value;
    console.log("aprlUnit", this.aprlUnitValue);
  }
  mayUnit(event: any) {
    this.mayUnitValue = event.target.value;
    console.log("mayUnit", this.mayUnitValue);
  }
  juneUnit(event: any) {
    this.juneUnitValue = event.target.value;
    console.log("juneUnit", this.juneUnitValue);
  }
  julyUnit(event: any) {
    this.julyUnitValue = event.target.value;
    console.log("julyUnit", this.julyUnitValue);
  }
  augUnit(event: any) {
    this.augUnitValue = event.target.value;
    console.log("augUnit", this.augUnitValue);
  }
  septUnit(event: any) {
    this.septUnitValue = event.target.value;
    console.log("septUnit", this.septUnitValue);
  }
  octUnit(event: any) {
    this.octUnitValue = event.target.value;
    console.log("octUnit", this.octUnitValue);
  }
  novUnit(event: any) {
    this.novUnitValue = event.target.value;
    console.log("novUnit", this.novUnitValue);
  }
  decUnit(event: any) {
    this.decUnitValue = event.target.value;
    console.log("decUnit", this.decUnitValue);
  }
  totalUnit(event: any) {
    this.totalUnitValue = event.target.value;
    console.log("totalUnit", this.totalUnitValue);
  }
  jan(event: any) {
    this.janValue = event.target.value;
    console.log("JAnVAlue", this.janValue);
  }
  feb(event: any) {
    this.febValue = event.target.value;
    console.log("febVAlue", this.febValue);
  }
  mar(event: any) {
    this.marValue = event.target.value;
    console.log("marVAlue", this.marValue);
  }
  aprl(event: any) {
    this.aprlValue = event.target.value;
    console.log("aprlVAlue", this.aprlValue);
  }
  may(event: any) {
    this.mayValue = event.target.value;
    console.log("mayVAlue", this.mayValue);
  }
  june(event: any) {
    this.juneValue = event.target.value;
    console.log("juneVAlue", this.juneValue);
  }
  july(event: any) {
    this.julyValue = event.target.value;
    console.log("julyVAlue", this.julyValue);
  }
  aug(event: any) {
    this.augValue = event.target.value;
    console.log("augVAlue", this.augValue);
  }
  sept(event: any) {
    this.septValue = event.target.value;
    console.log("septVAlue", this.septValue);
  }
  oct(event: any) {
    this.octValue = event.target.value;
    console.log("octVAlue", this.octValue);
  }
  nov(event: any) {
    this.novValue = event.target.value;
    console.log("novVAlue", this.novValue);
  }
  dec(event: any) {
    this.decValue = event.target.value;
    console.log("decVAlue", this.decValue);
  }
  TotalValue(event: any) {
    this.totalValue = event.target.value;
    console.log("totalVAlue", this.totalValue);
  }



  saveTargetData() {
    localStorage.setItem("updateAddEditTarget",'edit');
    console.log('mm saveTargetData', this.mainadd);
    let obj: any;
    if (this.selectedDealer.length >= 1) {
      this.mainadd[0].geography.forEach(element => {
        let dealers: any = [];
        for (let i = 0; i < this.selectedDealer.length; i++) {
          if (this.selectedDealer[i] === element.CustomerId) {
            
            element.targets.forEach(element1 => {
              
              if (element1.targetUnit.jan == "") {
                element1.targetUnit.jan = 0;
              }
              if (element1.targetUnit.feb == "") {
                element1.targetUnit.feb = 0;
              }
              if (element1.targetUnit.mar == "") {
                element1.targetUnit.mar = 0;
              }
              if (element1.targetUnit.apr == "") {
                element1.targetUnit.apr = 0;
              }
              if (element1.targetUnit.may == "") {
                element1.targetUnit.may = 0;
              }
              if (element1.targetUnit.june == "") {
                element1.targetUnit.june = 0;
              }
              if (element1.targetUnit.july == "") {
                element1.targetUnit.july = 0;
              }
              if (element1.targetUnit.aug == "") {
                element1.targetUnit.aug = 0;
              }
              if (element1.targetUnit.sep == "") {
                element1.targetUnit.sep = 0;
              }
              if (element1.targetUnit.oct == "") {
                element1.targetUnit.oct = 0;
              }
              if (element1.targetUnit.nov == "") {
                element1.targetUnit.nov = 0;
              }
              if (element1.targetUnit.dec == "") {
                element1.targetUnit.dec = 0;
              }


              if (element1.targetValue.jan == "") {
                element1.targetValue.jan = 0;
              }
              if (element1.targetValue.feb == "") {
                element1.targetValue.feb = 0;
              }
              if (element1.targetValue.mar == "") {
                element1.targetValue.mar = 0;
              }
              if (element1.targetValue.apr == "") {
                element1.targetValue.apr = 0;
              }
              if (element1.targetValue.may == "") {
                element1.targetValue.may = 0;
              }
              if (element1.targetValue.june == "") {
                element1.targetValue.june = 0;
              }
              if (element1.targetValue.july == "") {
                element1.targetValue.july = 0;
              }
              if (element1.targetValue.aug == "") {
                element1.targetValue.aug = 0;
              }
              if (element1.targetValue.sep == "") {
                element1.targetValue.sep = 0;
              }
              if (element1.targetValue.oct == "") {
                element1.targetValue.oct = 0;
              }
              if (element1.targetValue.nov == "") {
                element1.targetValue.nov = 0;
              }
              if (element1.targetValue.dec == "") {
                element1.targetValue.dec = 0;
              }

            })
            dealers.push(element);
          }



          
          obj = {
            TargetGroupId: this.targetId,
            CreatedById: this.userId,
            dealers: dealers
          }


          console.log('objectisnotworking', obj)
        }

        let obj1:any={
"TargetAssociationId":this.TargetAssociationId,
"TargetGroupId":this.targetGroupId,
"year":Number(this.mainadd[0].geography[0].year),
"setTarget":this.mainadd[0].geography[0].settarget,
"volume":this.mainadd[0].geography[0].targets[0].targetValue,
"units":this.mainadd[0].geography[0].targets[0].targetUnit,
"vtotal":this.mainadd[0].geography[0].vtotal,
"utotal":this.mainadd[0].geography[0].utotal,
"CreatedById":this.userId
        }
console.log('obj1obj1obj1',obj1)
        this.targetList.updateTargetData(obj1).subscribe((res) => {
          console.log("Added TargetData ", this.addedTargetData);
          if (res.response.result == 'DealerTargets Update Successfully') {
            this.dialogRef.close();
            this.dialog.open(DealerTargetSuccessPopupComponent, {panelClass: 'TargetSuccessPop'})
            // alert('Dealer Targets Update Successfully')
            this.sharedService.filter('Register click')

          }
        })

      });
    }
    else {
      // alert('select any dealer')
    }
  }


  cancel(){
    this.dialogRef.close();

  }
  getproductCount() {
    let data = {
      TargetGroupId: this.targetId,
      GeographyId: this.geographySelected,
      Customerid: this.dealerSelect
    }
    console.log("DAta", data)
    this.targetList.getProductCount(data).subscribe((res) => {
      this.ProductCount = res.response;
      console.log("this.ProductCount ", this.ProductCount);
    })
  }

  getSelectedTargetGroupName(): string {
    const selectedTarget = this.targetListData.find(item => item.targetGroupId === this.targetId);
    return selectedTarget ? selectedTarget.targetGroupName : '';
  }
  
}
