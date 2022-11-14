import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-date-range-selection',
  templateUrl: './date-range-selection.component.html',
  styleUrls: ['./date-range-selection.component.css']
})
export class DateRangeSelectionComponent implements OnInit {
  hoveredDate: NgbDate | undefined;

  fromDate: NgbDate;
  toDate: NgbDate;

   dateForm: FormGroup;

  constructor(calendar: NgbCalendar, private formBuilder: FormBuilder) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.dateForm = this.formBuilder.group({
      date: [null, Validators.required],
    });
   }
   onDateSelection(date: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      // this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  onSubmit(form: FormGroup) {
    console.log(form.value)
  }
  ngOnInit(): void {
  }

}
