import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { AddTaxTemplateComponent } from '../../users/userPopups/add-tax-template/add-tax-template.component';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { LiveAnnouncer } from '@angular/cdk/a11y';
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
  public rowData3 = [
    {name: 'revathi', Taxitem: 'IGST', Status: 'Active'},
    {name: 'rani', Taxitem: 'CGST', Status: 'Inactive'},
    {name: 'naveen', Taxitem: 'SGST', Status: 'Inactive'},
    {name: 'swetha', Taxitem: 'IGST', Status: 'Locked'},
    {name: 'sneha', Taxitem: 'SGST', Status: 'Active'},
    {name: 'anjali', Taxitem: 'CGST', Status: 'Active'},
  ]
  toppings1 = new FormControl('');
  toppingList1:  any= [];
  
  columnDefs: ColDef[] = [
    // { headerName: "User Id",
    //   field: 'employeeCode' , sort: 'desc',width: 120},
  
    {   headerName: "User Name",field: 'name' },
    {   headerName: "Tax Items",field: 'Taxitem' },
  
    // { field: 'role',width: 100 },
  
    // {  headerName: "Email Id",
    //    field: 'emailId' },
  
    // {   headerName: "Phone no",
    //   field: 'mobilePhone',width: 150  },
  
    // {   headerName: "Last Login",
      // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
      // field: 'lastLoginDate',type: ['nonEditableColumn'], width: 220  },
  
  
    { headerName: "Status",
       field: 'Status', 
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Active', 'Inactive', 'Invited', 'Locked',],
    }
    
    
  
  },
  { headerName: "",
  field: '',  filter: false, sortable: false,
  cellRenderer: function clickNextRendererFunc(){
    return '<i class="fa fa-ellipsis-v" aria-hidden="true" (click)="editfn()"></i>';
}
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
    public defaultColDef: ColDef = {
      // set the default column width
      width: 150,
      // make every column editable
      editable: true,
      // make every column use 'text' filter by default
      filter: 'agTextColumnFilter',
      // enable floating filters by default
      floatingFilter: true,
      // make columns resizable
      resizable: true,
      sortable: true,
      
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
  
  
    columns: Array<GuiColumn> = [
      {
        header: 'Name',
        field: 'name' 			//source {name: 'T-shirt'}
      },
      {
        header: 'Type',
        field: 'type' 			//source {type: 'clothes'}
      },
      {
        header: 'Price',
        field: 'price'			//source {price: '15$'}
      }];
  
    source: Array<any> = [
      {
        name: 'T-shirt',		//columns {header: 'Name', field: 'name'}
        type: 'clothes',		//columns {header: 'Type', field: 'type'}
        price: '15$' 			//columns {header: 'Price', field: 'price'}
      },
      {
        name: 'Shoes',
        type: 'footwear',
        price: '100$'
      },
      {
        name: 'Ball cap',
        type: 'headgear',
        price: '50$'
      }];
  
      sorting: GuiSorting = {
        enabled: true
    };
  
    paging: GuiPaging = {
      enabled: true,
      page: 1,
      pageSize: 10,
      pageSizes: [10, 25, 50],
      pagerTop: true,
      pagerBottom: true,
      display: GuiPagingDisplay.BASIC
    };
  
    searching: GuiSearching = {
      enabled: true,
      placeholder: 'Search heroes'
    };
  
    columnMenu: GuiColumnMenu = {
      enabled: true,
      sort: true,
      columnsManager: true,
  
    };
    displayedColumns: string[] = ['position', 'name',  'symbol','email','phonenum','login','status','edit'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    toppings = new FormControl('');
  constructor( private user:UserService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,) { sort:[];}
    @ViewChild(MatSort)
    sort: MatSort = new MatSort;
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
     
    }
  ngOnInit(): void {
    this.statusItems();
    
  }
  getusertabeldata(){
    this.user.getuserDeatils().subscribe((res: any) => {
        
      this.rowData = res.response;
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
  
statusItems(){
  this.user.getstatusDeatils().subscribe((res: any) => {
      
    let localdata=res.response;


    this.toppingList1 = localdata.map((data: { statusId: any; statusname: any; }) => {
      return {status_id: data.statusId, status_name: data.statusname };
    });

    if (!this.toppingList1?.length) {
      this.toppingList1 = localdata.map((status: { statusname: any; }) => {
        return status.statusname;
      });
    }
    this.toppingList1.push()
    // this.toppingList = res.response;
    this.toppings1 = new FormControl(this.toppingList1);

    console.log('status',this.toppingList1)




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


// Example of consuming Grid Event
onCellClicked( e: CellClickedEvent): void {
  console.log('cellClicked', e);
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
