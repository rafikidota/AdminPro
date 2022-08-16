import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  
  colors: string[] = ['red', 'yellow', 'orange'];
  labels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  data: number[] = [2500, 3500, 1000];

  constructor() { }

  ngOnInit(): void {
  }

}
