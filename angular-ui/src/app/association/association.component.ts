import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AssociationTargetPopupComponent } from './association-target-popup/association-target-popup.component';
import { UserService } from 'src/app/services/user.service';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {
  toppings1 = new FormControl('');
  toppingList1:  any= [];
  // const ELEMENT_DATA: PeriodicElement[] = [];
  public rowData3 = [
    {name: 'revathi', Taxitem: 'IGST', Status: 'Active'},
    {name: 'rani', Taxitem: 'CGST', Status: 'Inactive'},
    {name: 'naveen', Taxitem: 'SGST', Status: 'Inactive'},
    {name: 'swetha', Taxitem: 'IGST', Status: 'Locked'},
    {name: 'sneha', Taxitem: 'SGST', Status: 'Active'},
    {name: 'anjali', Taxitem: 'CGST', Status: 'Active'},
  ];
  columnDefs: ColDef[] = [

    {   headerName: "User Name",field: 'name' ,width:300},
    {   headerName: "Tax Items",field: 'Taxitem' ,width:300},
  
    { headerName: "Status",
       field: 'Status', 
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Active', 'Inactive', 'Invited', 'Locked',],
    }
    ,width:250
    
  
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
    dataSource = new MatTableDataSource();
  constructor(public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private user:UserService,) { }

   
    @ViewChild(MatSort)
    sort: MatSort = new MatSort;
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
     
    }
  ngOnInit(): void {
    this.statusItems();
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
  // targetSetModal(){
  //   const dialogRef =  this.dialog.open( AssociationTargetPopupComponent, { panelClass: 'custom-dialog-container' });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

}
