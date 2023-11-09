import { Component, OnInit,  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {AfterViewInit, ViewChild} from '@angular/core';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-masters',
  templateUrl: './other-masters.component.html',
  styleUrls: ['./other-masters.component.css']
})
export class OtherMastersComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  print :boolean= false;
  selectedTabIndex = 0;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  currentPageName:string ="";
  tabList:string[] = [];

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
  constructor(
    private observer: BreakpointObserver, private route: ActivatedRoute) {

      this.route.data.subscribe(v => {
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
        
      })
     }

  ngOnInit(): void {
 
  }
  ToggleSideNav(value:any){
    this.sidenav.toggle()
  }
  tabClick(tab) {
    // console.log(tab);
    if (tab.tab.textLabel == 'Tax Templates'){
this.print = true;
    }
    else if (tab.tab.textLabel == 'Unit of Measure'){
      this.print = false;
          }
          else if(tab.tab.textLabel == 'Currency Conversion'){
            this.print = true;
                }
  }
}






