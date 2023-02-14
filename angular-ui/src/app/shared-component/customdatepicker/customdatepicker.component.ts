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
  date: boolean = true;

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
      range: [dayjs(moment().startOf('quarter').format('DD MMM YY')), dayjs(moment().endOf('quarter').format('DD MMM YY'))],
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
      range: [dayjs(moment().subtract(1, 'quarter').startOf('quarter').format('DD MMM YY')), dayjs(moment().subtract(1, 'quarter').endOf('quarter').format('DD MMM YY'))],
    },
    {
      title: 'Last Year',
      range: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
    }];

  @Input() selectedDate: any;
  @Input() showInputField: boolean = false;
  @Input() showInputShipment: boolean = false;
  @Input() label: any;
  @Input() showDirectMenu:boolean = false;
  @Input() selectedMenu:string = "";
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
  close() {
    this.date = false;
    this.selectedDate = { startDate: '', endDate: '' };

    this.customDatePickerEvent.emit({ selectedDate: this.selectedDate });

  }

  ngOnChanges(change) {
    // console.log(change);
    if (this.selectedDate) {
      // console.log(this.selectedDate)
      if (this.selectedDate.startDate) {
        this.selected = {
          startDate: dayjs((this.selectedDate.startDate)),
          endDate: dayjs((this.selectedDate.endDate))
        }
      } else {
        this.selected = {
          startDate: dayjs(new Date()),
          endDate: dayjs(new Date())
        }
      }
      
    }
  }

  chosenDate(e: any): void {
    // console.log(e);

    if (e.startDate && e.endDate) {

      this.selectedDate = { startDate: dayjs(e.startDate).format('DD MMM YY'), endDate: dayjs(e.endDate).format('DD MMM YY') }
      console.log(this.selectedDate);
      if (!this.showDirectMenu && this.datePickerTrigger2.isOpen()) {
        this.datePickerTrigger2.close();
      }else if(this.showDirectMenu){
        this.showMenuDatePicker = false;
      }
    } else {
      this.selectedDate = { startDate: dayjs(new Date()).format('DD MMM YY'), endDate: dayjs(new Date()).format('DD MMM YY') }
    }

    this.customDatePickerEvent.emit({ selectedDate: this.selectedDate, selectedMenu:this.selectedMenu });
  }

  DateOptionClicked(clickedItem) {
    this.date = true;
    if (this.datePickerTrigger.isOpen()) {
      this.datePickerTrigger.close();
      // console.log(clickedItem);
      if (clickedItem == 'Custom') {
        if (!this.selected.startDate) {
          this.selected = {
            startDate: dayjs((this.selectedDate.startDate)),
            endDate: dayjs((this.selectedDate.endDate))
          }
        }
        this.datePickerTrigger2.open();

      } else {
        let selectedMenu = this.menuDateValues.find(item => item.title == clickedItem);
        if (selectedMenu) {
          this.selectedDate = { startDate: dayjs(selectedMenu.range[0]).format('DD MMM YY'), endDate: dayjs(selectedMenu.range[1]).format('DD MMM YY') }
          // this.label = this.selectedDate.startDate;
          this.customDatePickerEvent.emit({ selectedDate: this.selectedDate ,selectedMenu:this.selectedMenu});
        }
      }
    }
  }

  showMenuDatePicker:boolean = false;
 

  DateOptionMenuClicked(clickedItem){
    this.date = true;
    this.selectedMenu = clickedItem;
    if (clickedItem == 'Custom') {
      if (!this.selected.startDate) {
        this.selected = {
          startDate: dayjs((this.selectedDate.startDate)),
          endDate: dayjs((this.selectedDate.endDate))
        }
      }
      console.log("ssssssssss");
      this.showMenuDatePicker = !this.showMenuDatePicker;
    } else {
      let selectedMenuDate = this.menuDateValues.find(item => item.title == clickedItem);
      if (selectedMenuDate) {
        this.selectedDate = { startDate: dayjs(selectedMenuDate.range[0]).format('DD MMM YY'), endDate: dayjs(selectedMenuDate.range[1]).format('DD MMM YY') }
        // this.label = this.selectedDate.startDate;
        this.customDatePickerEvent.emit({ selectedDate: this.selectedDate, selectedMenu:this.selectedMenu });
      }
    }

  }
}
