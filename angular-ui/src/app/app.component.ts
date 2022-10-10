import { Component } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  expDate:any | undefined;
  todayDate:any|undefined;
  title = 'DMS';

  constructor(
    private router: Router,
  ) {
    // localStorage.clear();

   }

  ngOnInit(): void {
    this.expDate = localStorage.getItem("expires_at");

    let currentDate = new Date().getTime();
    this.todayDate = moment(currentDate);

    if(this.expDate > this.todayDate){
      this.router.navigate(['']);

    }

}
}
