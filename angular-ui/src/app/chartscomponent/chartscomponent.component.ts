import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-chartscomponent',
  templateUrl: './chartscomponent.component.html',
  styleUrls: ['./chartscomponent.component.css']
})

export class ChartscomponentComponent implements OnInit {
  
  
  ngOnInit(): void {
 
  }
  
  constructor() { }
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'white', 
      
      // borderWidth: 2,
      // height: 400
      
    },
    series: [
      {
        type: 'line',
        data: [10, 23, 7,10,20,7,10,10,13,30],
        color: '#06997E',
         
      },
     
     
      {
        type: 'area',
        data: [10, 23, 7, 10, 20, 7, 10, 10, 13, 30],
        color: 'rgba(6, 153, 126, 0.2)',
        marker: {
          enabled: false
        }
      }
    
    ],
    
    title : {
         style : {
           display : 'none'
         },
        },
        
    xAxis: {
      plotLines: [
        
        {
          color: 'gray',
          width: 0.3,
          value: 0,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 1,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 2,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 3,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 4,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 4,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 5,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 6,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 7,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 8,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 9,
          zIndex: 5,
        },
        {
          color: 'gray',
          width: 0.3,
          value: 10,
          zIndex: 5,
        },
       
      ],
      // plotBands: [
      //   {
      //     color: 'tomato', // Color of the negative value line
      //     from: -.5, // Start position of the negative value line
      //     to: 0, // End position of the negative value line
      //     zIndex: 5,
      //   },
      //   {
      //     color: 'tomato',
      //     from: -.5,
      //     to: 0,
      //     zIndex: 5,
      //   },
      //   // Add more plotBands for additional negative value lines
      // ],
      categories: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5','Product6', 'Product7', 'Product8', 'Product9', 'Product10'],
      
      labels: {
        //  rotation: -45, // Rotate the labels to -45 degrees for better readability
        step: 1, // Display every category label
        style: {
          whiteSpace: 'nowrap', // Prevent label text from wrapping
          overflow: 'hidden', // Hide overflow text
           textOverflow: 'ellipsis', // Add ellipsis (...) for truncated text
           fontSize: '12px', // Set the desired font size for the labels
         
        },
      
      
       

      
      },
      
      tickWidth: 1, // Set the width of the x-axis ticks
    
    },
    yAxis: {
      min: 0, 
      max: 40, 
      tickInterval: 10,
      labels: {
        formatter: function() {
          return (this.value as any / 1) + 'k'; 
        }
      },
      gridLineWidth: 1,

     
    
  
    },
    
    tooltip: {
      valueSuffix: ' Sales Details'
    }, 
     
    // plotOptions: {
    //   series: {
    //     lineWidth: 2 // Set the width of the line series
    //   },
    

    // },
    

  
  plotOptions: {
    series: {
      lineWidth: 2, // Set the width of the line series
      stacking: 'normal',
      
    },
  
    area: {
      fillColor: {
        linearGradient: { 
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, 'rgba(6, 153, 126, 1)'], 
          [1, 'rgba(6, 153, 126, 0)'] 
        ]
      }
    }
  }

   };

  }


