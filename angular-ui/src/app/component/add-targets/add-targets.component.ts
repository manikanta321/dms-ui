import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-targets',
  templateUrl: './add-targets.component.html',
  styleUrls: ['./add-targets.component.css']
})
export class AddTargetsComponent implements OnInit {
  image1 = 'assets/img/minimize-tag.png';
  rowsTotal: boolean = false;
  disableColumns: boolean = false;
  anuallySelected: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  onSelectTarget(event: any) {
    let data = event.target.value;
    if (data == "Quaterly") {
      this.disableColumns = true;
      this.anuallySelected = false;
    }
    if (data == "Yearly") {
      this.disableColumns = false;
      this.anuallySelected = false;
    }
    if (data == "Annually") {
      this.disableColumns = false;
      this.anuallySelected = true;
    }
  }
  expandTotalRows() {
    this.rowsTotal = !this.rowsTotal;

    if (this.rowsTotal === false) {
      this.image1 = 'assets/img/minimize-tag.png';
    } else {
      this.image1 = 'assets/img/maximize-arrow.png';

    }
  }
}
