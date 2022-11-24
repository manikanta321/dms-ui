import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { AddTaxTemplateComponent } from '../../users/userPopups/add-tax-template/add-tax-template.component';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { IDropdownSettings } from 'ng-multiselect-dropdown';  
import { TaxTemplateServiceService } from 'src/app/services/tax-template-service.service';
import { TaxTempleateActionComponent } from '../../tax-templeate-action/tax-templeate-action.component';
import { SharedService } from 'src/app/services/shared-services.service';
export interface PeriodicElement {
  name: any;
  position: string;
  weight: number;
  symbol: string;
  emailid:any;
  phonenum:number;
  status:any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: '6004005001', name: 'Rajasheka S', weight: 1.0079, symbol: 'Customer',emailid:'you@smartgig',phonenum:9448282822,status:'Active'},
  {position: '6004005002', name: 'Manoranjan B', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822,status:'Inactive'},
  {position: '6004005003', name: 'Vishnu M', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822 , status:'Active'},
  {position: '6004005004', name: 'Mahendra S', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822, status:'Invited'},
  {position: '6004005005', name: 'Veerendra kr', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
  {position: '6004005006', name: 'mahathi Br', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Active'},
   {position: '6004005007', name: 'chetheshwar T', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
   {position: '6004005008', name: 'Swami swami', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

   {position: '6004005006', name: 'narendra gs', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

   {position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

];
@Component({
  selector: 'app-tax-template',
  templateUrl: './tax-template.component.html',
  styleUrls: ['./tax-template.component.css']
})
export class TaxTemplateComponent implements OnInit {
  public rowData5 = [
    {name: 'revathi', Taxitem: 'IGST', Status: 'Active'},
    {name: 'rani', Taxitem: 'CGST', Status: 'Inactive'},
    {name: 'naveen', Taxitem: 'SGST', Status: 'Inactive'},
    {name: 'swetha', Taxitem: 'IGST', Status: 'Locked'},
    {name: 'sneha', Taxitem: 'SGST', Status: 'Active'},
    {name: 'anjali', Taxitem: 'CGST', Status: 'Active'},
  ]
  toppings1 = new FormControl('');
  toppingList1:  any= [];
  myForm:any= FormGroup;
  myForms:any= FormGroup;
  disabled = false;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  public popupParent: HTMLElement = document.body;
  
  columnDefs: ColDef[] = [ 

    { headerName: "Name",
  field: 'taxTemplateName' ,type: ['nonEditableColumn'],pinned: 'left',minWidth:500
  },
  
  {   headerName: "Tax Items",field: 'taxTemplateDetails',type: ['nonEditableColumn'] },
  
  // suppressMovable:true,
  { headerName: "Status",
   field: 'statusName',
   
   type: ['nonEditableColumn'],
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
  values: ['Active', 'Inactive', 'Invited', 'Locked',],
  },
  maxWidth:108,
  cellClass: params => {                      
    return params.value == 'Inactive' ? 'my-class-1':  params.value =='Active'?'my-class-2': params.value=='Invited'?'my-class-3':'my-class-4'
  }
  },
  { 
  
    headerName: '',
    colId: 'action',
    cellRenderer: TaxTempleateActionComponent,
    editable: false,
    maxWidth:60
  },
  
  // {
  //   headerName: "Avatar",
  //   field: "avatar",
  //   width: 100,
  //   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
  //  },
  
  ];
  
  rowData :any;
  rowData1=[]
  public defaultColDef: ColDef = { suppressSizeToFit: true,

    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    // make columns resizable
    resizable: true,
    sortable: true,
    flex: 1,
    width:100
  };
  // public defaultColDef: ColDef = {
  //   sortable: true,
  //   resizable: true,
  //   width: 100,
  //   enableRowGroup: true,
  //   enablePivot: true,
  //   enableValue: true,
  // };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
    medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
    nonEditableColumn: { editable: false },
    dateColumn: {
      // specify we want to use the date filter
      filter: 'agDateColumnFilter',
      // add extra parameters for the date filter
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = cellValue.split('/');
          const day = Number(dateParts[0]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[2]);
          const cellDate = new Date(year, month, day);
          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
  };
  
  // public sideBar: SideBarDef | string | string[] | boolean | null = {
  //   toolPanels: ['columns'],
  // };
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  
  roleName: any;
  statusname:any;
  props: any;
  msg1: any;
  msg: any;
  userId: any;
  roleArray:any[] = [];
  statusArray:any=[];
  selectedStatus: any = [];
   search:any='';
   paginationPageSize = 10;
  paginationScrollCount:any;
  start: number = 0;
  limit: number = 15;
  end: number = this.limit + this.start;

  gridsOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      editable: true,
      suppressMenu: true,
      filter: true,
      floatingFilter: true,
      filterParams: { buttons: ['clear'] }
    },
    headerHeight: 60,
    animateRows: true,
    pagination: false,
    paginationAutoPageSize: false,
}
instancePopup:any = null;
    displayedColumns: string[] = ['position', 'name',  'symbol','email','phonenum','login','status','edit'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    toppings = new FormControl('');
  selectedItems: any=[];
  userTypes:any=[];
  statusTypes:any=[];
  searchText:any='';
  scrolledIndex: any;
  ShowFilter = false;
  StatusFilter = false;
  limitSelection = false;
  statusSelection =false;
  toppingList: any= [];
  taxId: any;
  taxTemplateName:any;
  stayScrolledToEnd = true;
  messages: any[] = [];

  constructor( private user:UserService,   
   private tax:TaxTemplateServiceService,
   
    public dialog: MatDialog,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private _liveAnnouncer: LiveAnnouncer,) { sort:[];}
    onFirstDataRendered(params: FirstDataRenderedEvent) {
      params.api.sizeColumnsToFit();
      
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m)
      this.getusertabeldata()

    })
    }
    @ViewChild(MatSort)
    sort: MatSort = new MatSort;
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
     
    }
  ngOnInit(): void {
    this.statusItems();
    this.getusertabeldata();
    // this.roleItems();

    this.myForm = this.fb.group({
      city: [this.selectedItems]
  });
  this.myForms = this.fb.group({
    citys: [this.selectedItems]
  });
  }
  scrolledIndexChange(i): void {
    this.scrolledIndex = i;
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }
  
  handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
  toogleStatusFilter() {
  this.StatusFilter = !this.StatusFilter;
  this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { allowSearchFilter: this.StatusFilter });
  }
  
  handleStatusSelection() {
  if (this.statusSelection) {
      this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { statusSelection: 2 });
  } else {
      this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { statusSelection: null });
  }
  
    }
    refresh(){
      this.toppings = new FormControl(this.toppingList);
      this.toppings1 = new FormControl(this.toppingList1);
      this.myForm = this.fb.group({
        city: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
      // var ageFilterComponent = this.gridApi.getFilterInstance('')!;
      // ageFilterComponent.setModel(null);
      // this.gridApi.onFilterChanged();
      const data={
        Statuss:[],
        Search:"",
    
      }
      this.tax.gettaxlist(data).subscribe((res: any) => {
        this.rowData5 = res.response;
      });
  this.getusertabeldata();
    }

  onStatusAll(items: any) {
    console.log('onSelectAll', items);
    }
    onStatusSelect(item: any) {
      this.statusTypes.push(item.statusId);
    
      const data={
        Statuss:this.statusTypes,
        Search:this.searchText,
      }
      this.tax.gettaxlist(data).subscribe((res: any) => {
        this.rowData5 = res.response;
      });
      
    }
    onItemDeSelect(item: any) {

      this.userTypes.forEach((element,index)=>{
        if(element==item.roleId)  this.userTypes.splice(index,1);
     });
     console.log(' this.userTypes', this.userTypes)
    
      // this.userTypes.pop(item.roleId);
      const data={
        statuss:this.statusTypes,
        search:this.searchText,
    
      }
      this.tax.gettaxlist(data).subscribe((res: any) => {
        this.rowData5 = res.response;
      });
    
    }
    onItemSelect(item: any) {

      // alert(item.roleName)
        this.userTypes.push(item.roleId);
      
        const data={
          Statuss:this.statusTypes,
          Search:this.searchText,
      
        }
        this.tax.gettaxlist(data).subscribe((res: any) => {
          this.rowData5 = res.response;
        });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);
      }
      onItemSelectOrAll(item:any){
        this.userTypes=this.roleArray;
        const data={
          Statuss:this.statusTypes,
          Search:this.searchText,
      
        }
        this.tax.gettaxlist(data).subscribe((res: any) => {
          this.rowData5 = res.response;
        });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);}
      onItemDeSelectOrAll(item:any){
        const data={
          Statuss:[],
          Search:this.searchText,
      
        }
        this.tax.gettaxlist(data).subscribe((res: any) => {
          this.rowData5 = res.response;
        });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);
      }
      
        onItemDeSelectOrAllStatus(item:any){
          const data={
            Statuss:[],
            Search:this.searchText,
        
          }
          this.tax.gettaxlist(data).subscribe((res: any) => {
            this.rowData5 = res.response;
          });
          console.log('rolefilter', this.userTypes)
        }
      
      
        onItemSelectOrAllStatus(item:any){
          this.statusTypes=this.statusArray;
          console.log('y this is not coming',this.statusTypes)
          const data={
            statuss:this.statusTypes,
            search:this.searchText,
        
          }
          this.tax.gettaxlist(data).subscribe((res: any) => {
            this.rowData5 = res.response;
          });
        }
    
    
    onStatusDeSelect(item: any) {
      alert(item)
      this.statusTypes.forEach((element,index)=>{
        if(element==item.statusId)  this.statusTypes.splice(index,1);
     });
      // this.statusTypes.pop(item.statusId);
    console.log(' this.statusTypes', this.userTypes)
      const data={
        statuss:this.statusTypes,
        search:this.searchText,
    
      }
      this.tax.gettaxlist(data).subscribe((res: any) => {
        this.rowData5 = res.response;
      });
      console.log('rolefilter', this.userTypes)
      console.log('onItemSelect', item);
    }
  getusertabeldata(){
    let data={
      Search:this.searchText,
      Statuss:this.statusTypes,

      
    }
    this.tax.gettaxlist(data).subscribe((res: any) => {
        
      this.rowData5 = res.response;
      if (this.rowData.length >= 1) {
      this.rowData.forEach((element: { [x: string]: any; }) => {
      if (element['status']=='Confirmed'){
  }
      else{
        element['isActive']=='Inactive'
  
      }
  console.log('element',element['isActive'])
      });
    }
  
      console.log('row data',this.rowData1)
  
    });
  }
  
  
onSearchChange($event:any , anything?:any){
  const { target } = $event;
  this.searchText=target.value;
  const data={
    Statuss:this.statusTypes,
    search:this.searchText,
  }
  this.tax.gettaxlist(data).subscribe((res: any) => {
    console.log('uom list',res.response)
    
   this.rowData5=res.response;

  });
}


  statusItems(){
    const data ={
  
    }
    this.user.tatemplatestatus(data).subscribe((res: any) => {
      this.toppingList1=res.response;
      // this.toppingList1 = localdata.map((data: { status_id: any; status_name: any; }) => {
      //   return {status_id: data.status_id, status_name: data.status_name };
      // });
  
      // if (!this.toppingList1?.length) {
      //   this.toppingList1 = localdata.map((status: { status_name: any; }) => {
      //     return status.status_name;
      //   });
      // }
      // this.toppingList1.push()
      console.log('we have to check here', this.toppingList1)
      this.toppingList1.forEach(element=>{
        return   this.statusArray.push(element.statusId);
             // console.log('rolecheck',rolecheck)
     
         })
         console.log('statusArray',this.statusArray)
      // this.toppingList = res.response;
      this.dropdownSettings1 = {
        singleSelection: false,
        idField: 'statusId',
        textField: 'statusName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: this.StatusFilter
      };
      this.selectedStatus = [];
      this.toppings1 = new FormControl(this.toppingList1);
  
    });
  }

addtaxTempl(){
  this.dialog.open( AddTaxTemplateComponent,);
}
applyFilter(event: Event) {


  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
announceSortChange(sortState: any) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

handleRowDataChanged(event) {
  const index = this.messages.length - 1;
  if (this.stayScrolledToEnd) {
    //this.gridOptions.ensureIndexVisible(index, 'bottom');
  }
}

handleScroll(event) {
  if(this.instancePopup){
    this.instancePopup.togglePopup();
    this.instancePopup = null;
  }
  
  const grid = document.getElementById('gridContainer');
  if (grid) {
    const gridBody = grid.querySelector('.ag-body-viewport') as any;
    const scrollPos = gridBody.offsetHeight + event.top;
    const scrollDiff = gridBody.scrollHeight - scrollPos;
    //const api =  this.rowData5;
    this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
    this.paginationScrollCount = this.rowData5.length;
  }
}


// Example of consuming Grid Event
onCellClicked( e) {
  console.log('cellClicked', e);
  this.taxId=e.data.taxTemplateId
  localStorage.setItem('taxId', this.taxId)
  // alert(this.taxId)
  this.taxTemplateName=e.data.taxTemplateName
  localStorage.setItem('taxTemplateName', this.taxTemplateName)

  

  if ( e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action' ) {
    const cellRendererInstances = e.api.getCellRendererInstances({
      rowNodes: [e.node],
      columns: [e.column],
    });
    if (cellRendererInstances.length > 0) {
      const instance = cellRendererInstances[0];
      this.instancePopup = instance;
      instance.togglePopup();
    }
  }


}

openDialog(){

}

onCellValueChanged(event: CellValueChangedEvent) {
  alert(event.value)
  console.log(
    'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
  );
}


onRowValueChanged(event: RowValueChangedEvent) {
  var data = event.data;
  alert(data.status)
  // console.log(
  //   'onRowValueChanged: (' +
  //     data.make +
  //     ', ' +
  //     data.model +
  //     ', ' +
  //     data.price +
  //     ', ' +
  //     data.field5 +
  //     ')'
  // );
}
clickNextRendererFunc(){
  alert('hlo');
}
editfn(){
  alert('revs')
}
}
