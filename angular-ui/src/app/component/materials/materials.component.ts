import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit{
  sideBarOpen = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  currentPageName:string ="";
  selectedTabIndex = 0;
  tabList:string[] = [];
  constructor(private observer: BreakpointObserver, private route: ActivatedRoute,) {
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

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
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
  }
 
  ToggleSideNav(value:any){
    this.sidenav.toggle()
  }
}
