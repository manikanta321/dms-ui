import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as moment from 'moment';
import dayjs from 'dayjs/esm';


@Component({
  selector: 'app-customdatepicker',
  templateUrl: './customdatepicker.component.html',
  styleUrls: ['./customdatepicker.component.css'],
})
export class CustomdatepickerComponent implements OnInit {

  @ViewChild('datepickerBtn') datePickerTrigger;
  @ViewChild('datepickerBtn2') datePickerTrigger2;
  selected: any;
  menuDateValues: any = [
    {
      title: 'Custom',
      range: null
    },
    {
      title: 'last 30 days',
      range: [dayjs().subtract(29, 'days'), dayjs()],
    },
    {
      title: 'last 60 days',
      range: [dayjs().subtract(59, 'days'), dayjs()],
    },
    {
      title: 'last 90 days',
      range: [dayjs().subtract(89, 'days'), dayjs()],
    },
    {
      title: 'last 180 days',
      range: [dayjs().subtract(179, 'days'), dayjs()],
    },
    {
      title: 'This Month',
      range: [dayjs().startOf('month'), dayjs().endOf('month')],
    },
    {
      title: 'This Quater',
      range: [dayjs(moment().startOf('quarter').format('MM/DD/YYYY')), dayjs(moment().endOf('quarter').format('MM/DD/YYYY'))],
    },
    {
      title: 'This Year',
      range: [dayjs().startOf('year'), dayjs().endOf('year')],
    },
    {
      title: 'Last Month',
      range: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
    },
    {
      title: 'Last Quater',
      range: [dayjs(moment().subtract(1, 'quarter').startOf('quarter').format('MM/DD/YYYY')), dayjs(moment().subtract(1, 'quarter').endOf('quarter').format('MM/DD/YYYY'))],
    },
    {
      title: 'Last Year',
      range: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
    }];

  @Input() selectedDate: any;
  @Input() showInputField: boolean = false;
  @Input() showInputShipment: boolean = false;
  @Input() label :  any;
  @Output() customDatePickerEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.selected = {
      startDate: dayjs(new Date()),
      endDate: dayjs(new Date())
    };
  }

  ngOnInit() {
    console.log(this.selectedDate);

  }

  ngOnChanges(change) {
    console.log(change);
    if (this.selectedDate) {
      console.log(this.selectedDate)
      this.selected = {
        startDate: dayjs((this.selectedDate.startDate)),
        endDate: dayjs((this.selectedDate.endDate))
      }
    }
  }

  chosenDate(e: any): void {
    console.log(e);

    if (e.startDate && e.endDate) {
      
      this.selectedDate = { startDate: dayjs(e.startDate).format('MM/DD/YYYY'), endDate: dayjs(e.endDate).format('MM/DD/YYYY') }
      console.log(this.selectedDate);
      if (this.datePickerTrigger2.isOpen()) {
        this.datePickerTrigger2.close();
      }
    } else {
      this.selectedDate = { startDate: dayjs(new Date()).format('MM/DD/YYYY'), endDate: dayjs(new Date()).format('MM/DD/YYYY') }
    }

    this.customDatePickerEvent.emit({ selectedDate: this.selectedDate });
  }

  DateOptionClicked( clickedItem) {
    if (this.datePickerTrigger.isOpen()) {
      this.datePickerTrigger.close();
      console.log(clickedItem);
      if (clickedItem == 'Custom') {
        this.datePickerTrigger2.open();
      } else {
        let selectedMenu = this.menuDateValues.find(item => item.title == clickedItem);
        if (selectedMenu) {
          this.selectedDate = { startDate: dayjs(selectedMenu.range[0]).format('MM/DD/YYYY'), endDate: dayjs(selectedMenu.range[1]).format('MM/DD/YYYY') }
          this.customDatePickerEvent.emit({ selectedDate: this.selectedDate });
        }
      }
    }
  }
}
