import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, ChartConfiguration, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html'
})
export class DoughnutComponent implements OnInit {

  @Input() title: string = 'Untitled';
  @Input() colors: string[] = ['red', 'blue', 'violet'];
  @Input() labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() data: number[] = [350, 450, 100];

  // Doughnut
  public doughnutChartLabels: string[] = this.labels;
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.data, backgroundColor: this.colors },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor() { }

  ngOnInit(): void {
    this.doughnutChartData.labels = this.labels;
    this.doughnutChartData.datasets[0].backgroundColor = this.colors;
    this.doughnutChartData.datasets[0].data = this.data;
  }

}
