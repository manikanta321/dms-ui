import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPromotionsComponent } from '../add-promotions/add-promotions.component';
import { ImpactedAssociationComponent } from './impacted-association/impacted-association.component';
import { MaterialAddEditpopupComponent } from './material-add-editpopup/material-add-editpopup.component';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { UserService } from 'src/app/services/user.service';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import {FormControl} from '@angular/forms';
// import { ButtonRendererComponent } from './renderer/button-renderer.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  emailid:any;
  phonenum:number;
  status:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554,status:'active'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554,status:'inactive'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554 , status:'active'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'invited'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'active'},
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
];

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'classification', 'unitofMeasure','productgroup','sku','status','edit','activateSection','action'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog,
    private user:UserService,) { }
  rowData :any;
  rowData1=[]
  columnDefs: ColDef[] = [
    { headerName: "Name",
      field: 'name' , sort: 'desc',width: 120},
  
    {   headerName: "Classification",field: 'classification' },
  
    // { field: 'classification',width: 100 },
  
    {  headerName: "Unit of Measure",
       field: 'UnitofMeasure' },
  
    {   headerName: "Product Group",
      field: 'productGroup',width: 150  },
  
    {   headerName: "SKU",
      // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
      field: 'sku',type: ['nonEditableColumn'], width: 220  },
      // {
      //   headerName: 'Button Col 1',
      //   cellRenderer: 'buttonRenderer',
      //   cellRendererParams: {
      //     onClick: '',
      //     label: 'Click 1'
      //   }
      // },
  
  
    { headerName: "Status",
       field: 'status', width: 100,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Active', 'Inactive', 'Invited', 'Locked',],
    }
    
  
  },

  {
    headerName: "Edit",
    field: "edit",
    width: 100,
    cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
   },
   {   headerName: "",
   field: 'activation',width: 150  },
  
  ];
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
  onCellValueChanged(event: CellValueChangedEvent) {
    alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }

// Data that gets displayed in the grid
public rowData3=[
{classification: 'Dummy', name: 'Vishnu M', UnitofMeasure: 1, productGroup: 'Dummy',sku:'KA12356' , status:'Active',edit:'',activation:'Reactivate'},
{classification: 'Dummy', name: 'Mahendra S', UnitofMeasure: 5, productGroup: 'Dummy',sku:'KA12356', status:'Invited',edit:''},
{classification: 'Dummy', name: 'Veerendra kr', UnitofMeasure: 4, productGroup: 'Dummy',sku:'KA12356', status:'Locked',edit:'',activation:'Deactivate'},
{classification: 'Dummy', name: 'mahathi Br', UnitofMeasure: 3, productGroup: 'Dummy',sku:'KA12356', status:'Active',edit:''},
{classification: 'Dummy', name: 'chetheshwar T', UnitofMeasure: 2, productGroup: 'Dummy',sku:'KA12356', status:'Locked',edit:''},
{classification: 'Dummy', name: 'Swami swami', UnitofMeasure: 1, productGroup: 'Dummy',sku:'KA12356', status:'Locked',edit:'',activation:'Reactivate'},
{classification: 'Dummy', name: 'narendra gs', UnitofMeasure: 5, productGroup: 'Dummy',sku:'KA12356', status:'Locked',edit:''},
{classification: 'Dummy', name: 'prajwal vT', UnitofMeasure: 2, productGroup: 'Dummy',sku:'KA12356', status:'Locked',edit:'',activation:'Deactivate'},

];


  ngOnInit(): void {
    this.getusertabeldata();
  }
  addMaterial(){
    this.dialog.open( MaterialAddEditpopupComponent);
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
  selected = 'Search';

  addEditMaterial(){
    const dialogRef =  this.dialog.open( MaterialAddEditpopupComponent, { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  impactedAssociation(){
    const dialogRef =  this.dialog.open( ImpactedAssociationComponent , { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addpromotion(){
    const dialogRef =  this.dialog.open( AddPromotionsComponent , {height: '600px', panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
