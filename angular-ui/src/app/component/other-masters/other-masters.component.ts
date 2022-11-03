import { Component, OnInit,  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {AfterViewInit, ViewChild} from '@angular/core';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-other-masters',
  templateUrl: './other-masters.component.html',
  styleUrls: ['./other-masters.component.css']
})
export class OtherMastersComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  print :boolean= false;

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
  constructor(
    private observer: BreakpointObserver,) { }

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






