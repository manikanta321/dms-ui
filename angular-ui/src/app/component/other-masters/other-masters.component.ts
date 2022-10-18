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

}






