import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  mainadd: any = [{
  }]



  userId: any;
  constructor(
    private targetList: TargetListService,
    private fb: FormBuilder,
    private user: UserService,
    private dialogRef: MatDialogRef<EditDealerTargetComponent>,
    private sharedService: DealerTargetSharedServicesService,

  ) {

  }
  ngOnInit(): void {
    let id = localStorage.getItem('editOrAddTarget');
    let data = {
      TargetAssociationId: Number(id),
    }
    this.targetList.getTargetById(data).subscribe((res) => {
      console.log(res.response);
      this.targetId = res.response.targetGroupId;
      this.productCount = res.response.totalProductCount;



      this.mainadd[0].geography = []
      this.mainadd[0].targetGroupId = res.response.targetGroupId;
      this.mainadd[0].targetGroupName = res.response.targetGroupName;

      this.mainadd[0].customerId = res.response.customerId;

      this.mainadd[0].customerName = res.response.customerName;

      this.mainadd[0].CreatedById = this.userId;

      let geographyobj: any = {}
      let geographyobj1: any = []

      res.response.geography.forEach((element) => {
        geographyobj.geographyId = element.geographyId;

        geographyobj.geographyName = element.geographyName;

        geographyobj.productCount = element.productCount;

        geographyobj.year = element.year;

        geographyobj.settarget = element.settarget;

        let mainobj: any = [];

        let mainobj1: any = {}

        element.targets.forEach((res1) => {
          mainobj1.targetMonthNo = res1.targetMonthNo;
            mainobj1.targetMonth = res1.targetMonth;
            mainobj1.targetValue = res1.targetValue;
            mainobj1.targetUnit = res1.targetUnit;

            mainobj.push(mainobj1)



                   });

                   geographyobj.targets=mainobj
                   geographyobj1.push(geographyobj)

      });
      
      this.mainadd[0].geography= geographyobj1;


      console.log('object for edit', this.mainadd[0])
})






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
    this.financialYear = event.target.value;
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
    this.mainadd[0].dealers[i].targets[j].utotal = Number(this.mainadd[0].dealers[i].targets[j].units.jan) + Number(this.mainadd[0].dealers[i].targets[j].units.feb) + Number(this.mainadd[0].dealers[i].targets[j].units.mar) + Number(this.mainadd[0].dealers[i].targets[j].units.apr) + Number(this.mainadd[0].dealers[i].targets[j].units.may) + Number(this.mainadd[0].dealers[i].targets[j].units.jun) + Number(this.mainadd[0].dealers[i].targets[j].units.jul) + Number(this.mainadd[0].dealers[i].targets[j].units.aug) + Number(this.mainadd[0].dealers[i].targets[j].units.sep) + Number(this.mainadd[0].dealers[i].targets[j].units.oct) + Number(this.mainadd[0].dealers[i].targets[j].units.nov) + Number(this.mainadd[0].dealers[i].targets[j].units.dec)
    // alert(this.mainadd[0].dealers[i].targets[j].units)

    // this.janUnitValue =event.target.value;
    console.log("janUnit", this.janUnitValue);
  }


  janUnit1(event: any, i, j) {
    //  this.mainadd[0].dealers[i].targets[j].units.jan + this.mainadd[0].dealers[i].targets[j].units.feb
    this.mainadd[0].dealers[i].targets[j].vtotal = Number(this.mainadd[0].dealers[i].targets[j].volume.jan) + Number(this.mainadd[0].dealers[i].targets[j].volume.feb) + Number(this.mainadd[0].dealers[i].targets[j].volume.mar) + Number(this.mainadd[0].dealers[i].targets[j].volume.apr) + Number(this.mainadd[0].dealers[i].targets[j].volume.may) + Number(this.mainadd[0].dealers[i].targets[j].volume.jun) + Number(this.mainadd[0].dealers[i].targets[j].volume.jul) + Number(this.mainadd[0].dealers[i].targets[j].volume.aug) + Number(this.mainadd[0].dealers[i].targets[j].volume.sep) + Number(this.mainadd[0].dealers[i].targets[j].volume.oct) + Number(this.mainadd[0].dealers[i].targets[j].volume.nov) + Number(this.mainadd[0].dealers[i].targets[j].volume.dec)
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
    console.log('mm saveTargetData', this.mainadd);
    let obj: any;
    if (this.selectedDealer.length >= 1) {
      this.mainadd[0].dealers.forEach(element => {
        let dealers: any = [];
        for (let i = 0; i < this.selectedDealer.length; i++) {
          if (this.selectedDealer[i] === element.CustomerId) {
            debugger
            element.targets.forEach(element1 => {
              debugger
              if (element1.units.jan == "") {
                element1.units.jan = 0;
              }
              if (element1.units.feb == "") {
                element1.units.feb = 0;
              }
              if (element1.units.mar == "") {
                element1.units.mar = 0;
              }
              if (element1.units.apr == "") {
                element1.units.apr = 0;
              }
              if (element1.units.may == "") {
                element1.units.may = 0;
              }
              if (element1.units.jun == "") {
                element1.units.jun = 0;
              }
              if (element1.units.jul == "") {
                element1.units.jul = 0;
              }
              if (element1.units.aug == "") {
                element1.units.aug = 0;
              }
              if (element1.units.sep == "") {
                element1.units.sep = 0;
              }
              if (element1.units.oct == "") {
                element1.units.oct = 0;
              }
              if (element1.units.nov == "") {
                element1.units.nov = 0;
              }
              if (element1.units.dec == "") {
                element1.units.dec = 0;
              }


              if (element1.volume.jan == "") {
                element1.volume.jan = 0;
              }
              if (element1.volume.feb == "") {
                element1.volume.feb = 0;
              }
              if (element1.volume.mar == "") {
                element1.volume.mar = 0;
              }
              if (element1.volume.apr == "") {
                element1.volume.apr = 0;
              }
              if (element1.volume.may == "") {
                element1.volume.may = 0;
              }
              if (element1.volume.jun == "") {
                element1.volume.jun = 0;
              }
              if (element1.volume.jul == "") {
                element1.volume.jul = 0;
              }
              if (element1.volume.aug == "") {
                element1.volume.aug = 0;
              }
              if (element1.volume.sep == "") {
                element1.volume.sep = 0;
              }
              if (element1.volume.oct == "") {
                element1.volume.oct = 0;
              }
              if (element1.volume.nov == "") {
                element1.volume.nov = 0;
              }
              if (element1.volume.dec == "") {
                element1.volume.dec = 0;
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

        this.targetList.addTargetData(obj).subscribe((res) => {
          console.log("Added TargetData ", this.addedTargetData);
          if (res.response == 'successfully addres DealerTargets') {
            this.dialogRef.close();
            alert('added')
            this.sharedService.filter('Register click')

          }
        })

      });
    }
    else {
      alert('select any dealer')
    }
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
}
