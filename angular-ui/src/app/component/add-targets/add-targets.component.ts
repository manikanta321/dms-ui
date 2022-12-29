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
  dealer:any = FormGroup;
  geoForm:any = FormGroup;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
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
  }
  onSelectTarget(event: any) {
    let data = event.target.value;
    if (data == "Quaterly") {
      this.disableColumns = true;
      this.anuallySelected = false;
    }
    if (data == "Yearly") {
      this.disableColumns = false;
      this.anuallySelected = false;
    }
    if (data == "Annually") {
      this.disableColumns = false;
      this.anuallySelected = true;
    }
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
    this.targetId = item.catId;
  }
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
    this.user.getGographicDropdown().subscribe((res: any) => {
      this.geographyList = res.response;
      let localdata = this.geographyList;
      this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      this.geographyListData.push()
      this.geographyListData.forEach(element => {
        return this.geographyArray.push(element.geographyId);
      })
      console.log('rolearray', this.geographyArray)              
    });
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
}
