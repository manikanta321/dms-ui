import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ngbPositioning } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { Tooltip, TooltipComponent, TooltipEventArgs  } from '@syncfusion/ej2-angular-popups';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-icon-hover',
  templateUrl: './icon-hover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./icon-hover.component.css']
})
export class IconHoverComponent implements OnInit,ICellRendererAngularComp {
  cellValue: any;
  rowData: any;
  districtLevelList: any = [];
  isSelectedValue: any = [];
  newItems: any;
  value: any;
  currentQuestionIndex = 0;
  newArray: any;
  split: any;
  responseArray: any;
  newListItems: any;
  constructor(private user: UserService) {
    
   }
  agInit(params: any): void {
    this.cellValue = params.value;
    this.rowData = params.data;
    this.getDataFromApi(params);
  }
  refresh(params : any): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    
  }
  getDataFromApi(params){
    const data = {
      "GeographyId":params?.geographyId,
      "CustomerId":params?.customerId,
    }
    this.user.getDistrictLevelDataOnMouseOver(data).subscribe((res: any) => {
      var data = res.response;
      this.districtLevelList = data.map((ele) => (ele.isSelected) ? 
      
'<li class="tooltipRed">' + '<span class="tooltipRed">' +   ele.geographyName + '</span>' + '<li>': 
'<li class="tooltipBlue">'+'<span class="tooltipBlue">' + ele.geographyName + '</span>' + '<li>');

this.newListItems = '<ul class = "contentStyle">'+this.districtLevelList  + '</ul>';
console.log("dfdf" , this.newListItems)
     
   });
  }

  // });


public onToggle(event , rowData): void {
 this.getDataFromApi(rowData);
}
}
