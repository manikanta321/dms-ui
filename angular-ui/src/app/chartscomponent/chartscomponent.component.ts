import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-chartscomponent',
  templateUrl: './chartscomponent.component.html',
  styleUrls: ['./chartscomponent.component.css']
})

export class ChartscomponentComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: [1, 2, 3],
      },
    ],
    title: {
      text: 'linechart',
    },
  };
  constructor() { }

  ngOnInit(): void {
  }

}

