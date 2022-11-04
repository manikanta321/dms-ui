import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-geolist-popup',
  templateUrl: './add-geolist-popup.component.html',
  styleUrls: ['./add-geolist-popup.component.css']
})
export class AddGeolistPopupComponent implements OnInit {
  public packingCharges: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  errorMsg: any;
  addCountryButton: boolean = false;
  removelist: boolean = false;
  stateName: string[] = ['State 1', 'State 2',];
  constructor() { }

  ngOnInit(): void {
  }
  addCountry() {
    this.addCountryButton = true;
  }
  removesub(uId: number) {
    const index = this.packingCharges.findIndex((address) => address.id === uId);
    this.packingCharges.splice(index, 1);
  }
  addFields() {
    this.packingCharges.push({
      sValue: '',
      eValue: '',
      pValue: '',
    });
  }


}
