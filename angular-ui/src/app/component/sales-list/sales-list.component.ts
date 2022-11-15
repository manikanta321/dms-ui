import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  print: boolean = true;

  // @ViewChild(MatSort)
  // sort: MatSort = new MatSort;

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
  constructor(private observer: BreakpointObserver,) { }

  ngOnInit(): void {
  }
  ToggleSideNav(value: any) {
    this.sidenav.toggle()
  }
  tabClick(tab) {
    // console.log(tab);
    // if (tab.tab.textLabel == 'Inventory') {
    //   this.print = true;
    // }
    // else if (tab.tab.textLabel == 'Sales Uploads') {
    //   this.print = false;
    // }
    // else if (tab.tab.textLabel == 'Reports') {
    //   this.print = true;
    // }
  }
}
