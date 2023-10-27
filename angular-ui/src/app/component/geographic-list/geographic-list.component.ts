import { Component, OnInit } from '@angular/core';

import { DeletecomponentComponent } from '../deletecomponent/deletecomponent.component';

import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../users/userPopups/add-user-popup/add-user-popup.component';
import { AddGeolistPopupComponent } from '../add-geolist-popup/add-geolist-popup.component';

import { GeographicListActionComponent } from './geographic-settings-action/geographic-list-action/geographic-list-action.component';
import { AddGeolistShippingPopupComponent } from 'src/app/add-geolist-shipping-popup/add-geolist-shipping-popup.component';
import { UseractionComponent } from '../useraction/useraction.component';
import { GeographySettingSharedService } from 'src/app/services/geography-setting-shared.service';

export interface PeriodicElement {
  shippingForm: any;
  shippingTo: string;
  shippingCharges: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { shippingForm: '6004005001', shippingTo: 'Rajasheka S', shippingCharges: 1.0079 },
];

@Component({
  selector: 'app-geographic-list',
  templateUrl: './geographic-list.component.html',
  styleUrls: ['./geographic-list.component.css']
})
export class GeographicListComponent implements OnInit {

  private gridApi!: GridApi;
  myForm: any = FormGroup;
  myForms: any = FormGroup;
  selectedItems: any = [];
  rowData1 = [];
  rowData: any;
  userId: any;
  employeeName: any;
  searchText: any;
  userTypes: any = [];
  statusTypes: any = [];
  headerName: any;
  shippingBtn: any;
  shippingChk: boolean = true;
  paginationScrollCount: any;
  paginationScrollCountNew:any;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  instancePopup: any = null;
  messages: any[] = [];






  gridOptions = {
    resizable: true,
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    rowStyle: { background: 'black' },
  }


  shipPackCharges: any;
  shippingHeader: any;
  secondColumn: any;
  ThirdColumn: any;
  packageChk: boolean = false;
  // headerName: string;
  // fieldName: string;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user: UserService,
    private observer: BreakpointObserver,
    private fb: FormBuilder,
    private sharedService: GeographySettingSharedService,
  ) {
    this.sharedService.listen().subscribe((m: any) => {
      // console.log(m)
      if (this.shippingChk == true) {
        this.shipClick('Shipping')

      } else {
        this.shipClick('Packing')
      }
      this.getusertabeldata();
    })
  }

  ngOnInit(): void {
    this.getusertabeldata();

    this.shipClick('Shipping')


  }

  public rowData5 = [];
  public rowData6 = [];

  public popupParent: HTMLElement = document.body;
  columnDefs: ColDef[] = []
  columnDefs1: ColDef[] = []

  // columnDefs: ColDef[] = [

  //   {
  //     headerName: "User ID",
  //     field: 'employeeCode', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',
  //     tooltipField: "employeeCode", maxWidth: 200,

  //   },

  //   { headerName: "Username", field: 'userName', type: ['nonEditableColumn'], tooltipField: "userName", },

  //   { headerName: "Role", field: 'roleName', type: ['nonEditableColumn'], tooltipField: "roleName", },

  //   {
  //     headerName: "Email ",
  //     field: 'email', type: ['nonEditableColumn'],
  //     tooltipField: "email",
  //     // flex: 1,
  //   },

  //   {
  //     headerName: "Phone No",
  //     field: 'mobile', type: ['nonEditableColumn'],
  //     tooltipField: "mobile"
  //   },

  //   // suppressMovable:true,
  //   {
  //     headerName: "Status",
  //     field: 'statusName',
  //     maxWidth: 109,
  //     type: ['nonEditableColumn'],
  //     cellEditor: 'agSelectCellEditor',
  //     cellEditorParams: {
  //       values: ['Active', 'Inactive', 'Invited', 'Locked',],
  //     },
  //     cellClass: params => {
  //       return params.value == 'Inactive' ? 'my-class-1' : params.value == 'Active' ? 'my-class-2' : params.value == 'Invited' ? 'my-class-3' : 'my-class-4'
  //     },

  //     tooltipField: "statusName",
  //   },
  //   {
  //     headerName: '',
  //     colId: 'action',
  //     cellRenderer: UseractionComponent,
  //     editable: false,
  //     maxWidth: 60
  //   },

  // ];



  public defaultColDef: ColDef = {
    suppressSizeToFit: true,

    width: 400,
    filter: 'agTextColumnFilter',
    flex: 1,
    resizable: true,
    sortable: true,
  };


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
  displayedColumns: string[] = ['shippingForm', 'shippingTo', 'shippingCharges'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  toppings = new FormControl('');
  toppings1 = new FormControl('');

  // toppingList: string[] = ['Admin', 'Dealer','Customer'];
  toppingList: any = [];

  toppingList1: any = [];
  filterDictionary: any;
  sideBarOpen = true;
  scrolledIndex = 0;
  defaultPageSize = 12;

  refresh() {
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
    const data = {
      "search": "",
      "shipping": true
    }

    this.user.getGeography(data).subscribe((res) => {
      this.rowData5 = res.response;
    });


    const data1 = {
      "search": "",
      "shipping": false
    }

    this.user.getGeography(data1).subscribe((res) => {
      this.rowData6 = res.response;
    });
    this.getusertabeldata();
  }
  getusertabeldata() {



  }
  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  openDialog() {
    // alert('mani')

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();

  }
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }


  onCellClicked(e) {
    console.log('cellClicked', e);
    this.userId = e.data.userId;
    this.employeeName = e.data.employeeName;
    localStorage.setItem('GeoSettingUniqueKey', e.data.uniquekey)

    console.log('userID', this.userId)
    localStorage.setItem('userID', this.userId)
    localStorage.setItem('employeeName', this.employeeName)
    if (e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action') {
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



  handleRowDataChanged(event) {
    const index = this.messages.length - 1;
    if (this.stayScrolledToEnd) {
    }
  }

  handleScroll(event) {
    if (this.instancePopup && this.instancePopup.isOpen) {
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
      this.paginationScrollCountNew = this.rowData6.length;

    }
  }
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      "search": this.searchText,
      "shipping": true
    }

    this.user.getGeography(data).subscribe((res) => {
      this.rowData5 = res.response;
    });


    const data1 = {
      "search": this.searchText,
      "shipping": false
    }

    this.user.getGeography(data1).subscribe((res) => {
      this.rowData6 = res.response;
    });

  }
  addUser() {
    if (this.shippingChk == true) {
      localStorage.setItem('packingChargeOrShipingCharge', 'shippingCharge')
    } else {
      localStorage.setItem('packingChargeOrShipingCharge', 'PackingCharge')

    }
    localStorage.setItem('addOreditGeoGraphySettings', 'add')

    this.dialog.open(AddGeolistShippingPopupComponent, {
      width: '700px', //sets width of dialog
      height: '450px',
    });

  }

  addGeoShipping() {
    if (this.shippingChk == true) {
      localStorage.setItem('packingChargeOrShipingCharge', 'shippingCharge')
    } else {
      localStorage.setItem('packingChargeOrShipingCharge', 'PackingCharge')

    }
    this.dialog.open(AddGeolistShippingPopupComponent, {
      width: '700px', //sets width of dialog
      height: '450px',
    });

  }

  shipClick(event: any) {
    // this.fieldName = "Shipping Form";
    if (event == 'Shipping') {


      const data = {
        "search": "",
        "shipping": true
      }

      this.user.getGeography(data).subscribe((res) => {
        this.rowData5 = res.response;
      });



      this.shippingChk = true;
      this.columnDefs = [
        {
          headerName: 'Destination', field: 'geographyName', type: ['nonEditableColumn'],
          width: 200
        },

        { headerName: 'Shipping Charge', field: 'charges', type: ['nonEditableColumn','rightAligned'] },


        {
          headerName: '',

          colId: 'action',

          cellRenderer: GeographicListActionComponent,
          editable: false,
          maxWidth: 65
        },

      ];


    }
    else {

      const data1 = {
        "search": "",
        "shipping": false
      }

      this.user.getGeography(data1).subscribe((res) => {
        this.rowData6 = res.response;
      });
      this.columnDefs1 = [
        {
          headerName: 'Destination', field: 'geographyName', type: ['nonEditableColumn'],
          width: 200
        },

        { headerName: 'Packing Charge', field: 'charges', type: ['nonEditableColumn','rightAligned'], },


        {
          headerName: '',

          colId: 'action',

          cellRenderer: GeographicListActionComponent,
          editable: false,
          maxWidth: 65
        },

      ];



      this.shippingChk = false;

    }
    if (this.shippingChk == true) {
      localStorage.setItem('packingChargeOrShipingCharge', 'shippingCharge')
    } else {
      localStorage.setItem('packingChargeOrShipingCharge', 'PackingCharge')

    }
    this.shippingAndPackages();
  }

  shippingAndPackages() {



  }


}
