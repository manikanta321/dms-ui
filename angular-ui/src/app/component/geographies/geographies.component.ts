import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {AfterViewInit, ViewChild} from '@angular/core';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-geographies',
  templateUrl: './geographies.component.html',
  styleUrls: ['./geographies.component.css']
})
export class GeographiesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  countryname: string[] = ['India (71/126)', 'Malaysia  (178/178)', 'philippines (0/135)','Singapore (0/135)'];
  Sname: string[] = ['Andhra Pradesh (0/42)', 'Gujarat (36/36)','Telangana (21/22)', 'Tamil Nadu (36/36)'];
  Dname: string[] = ['Hyderabad', 'Adilabad','Warangal', 'Ranga Reddy'];
  Cname: string[] = ['Amberpet', 'Khairatabad', 'Jubilee Hills'];
  Rname:string[] = ['North 4/4)', 'East (8/8)', 'West (3/4)', 'South (8/8)']
  constructor(private observer: BreakpointObserver,) {
    
   }

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
  }

  
  ToggleSideNav(value:any){
    this.sidenav.toggle()
  }

}
