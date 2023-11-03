import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddUserPopupComponent } from '../users/userPopups/add-user-popup/add-user-popup.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild(AddUserPopupComponent) child; 
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  currentPageName:string="";
  tabList:string[] = [];
  selectedTabIndex = 0;
  userType:any;

  constructor(private observer: BreakpointObserver,
    private route: ActivatedRoute,) { this.route.data.subscribe(v => {
    this.currentPageName = v['key'];
    
    // let actionColumn = v['usersMenuList'];
    let showCaseTabList: string[] = [];
    let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');

    userRolesData.forEach(element => {
      if (element.title == this.currentPageName) {
        // this.columnDefs = this.columnDefs.filter(x => {
        //   if (x.colId != 'action' || element == undefined || element == null) return true;

          element.permission.forEach(item => {
            if(item.status){
              this.tabList.push(item.action.toLowerCase());
            }
            // if (actionColumn.indexOf(item.action.toLowerCase()) !== -1 && item.status) {
            //   showCaseMenuList.push(item.action);
            // }
          // })
          // return showCaseMenuList.length !== 0;
        });
      }
    })
    // console.log("showCaseMenuList.length", showCaseMenuList.length);
    
  }
)}

  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;


  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }


  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
  }


  ToggleSideNav(value:any){
    this.sidenav.toggle()
  }
  
}




