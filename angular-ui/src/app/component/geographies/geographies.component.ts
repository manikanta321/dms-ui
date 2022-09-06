import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geographies',
  templateUrl: './geographies.component.html',
  styleUrls: ['./geographies.component.css']
})
export class GeographiesComponent implements OnInit {
  countryname: string[] = ['India (71/126)', 'Malaysia  (178/178)', 'philippines (0/135)','Singapore (0/135)'];
  Sname: string[] = ['Andhra Pradesh (0/42)', 'Gujarat (36/36)','Telangana (21/22)', 'Tamil Nadu (36/36)'];
  Dname: string[] = ['Hyderabad', 'Adilabad','Warangal', 'Ranga Reddy'];
  Cname: string[] = ['Amberpet', 'Khairatabad', 'Jubilee Hills'];
  Rname:string[] = ['North 4/4)', 'East (8/8)', 'West (3/4)', 'South (8/8)']
  constructor() { }

  ngOnInit(): void {
  }

}
