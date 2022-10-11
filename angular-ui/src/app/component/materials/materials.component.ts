import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit{
  sideBarOpen = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver) { }

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
  // tabEvent: number | undefined;
  // p: number | undefined;
  // tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  //   this.tabEvent = tabChangeEvent.index;
  //   this.p=1;
  // }
  // sideBarToggler(){
  //   this.sideBarOpen = !this.sideBarOpen;
  // }
  ToggleSideNav(value:any){
    this.sidenav.toggle()
  }
}
