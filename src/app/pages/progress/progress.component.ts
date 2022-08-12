import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progress1: number = 25;
  progress2: number = 35;

  getProgress1() {
    return `${this.progress1}%`;
  }
  getProgress2() {
    return `${this.progress2}%`;
  }

  constructor() { }

  ngOnInit(): void {
  }
  changeProgress(value: number) {
    this.progress1 = value;
  }
}
