import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html'
})
export class BoosterComponent implements OnInit {

  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';
  @Output('value') valueOut: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.valueOut.emit(100);
      this.progress = 100;
      return;
    }
    else if (this.progress <= 0 && value <= 0) {
      this.valueOut.emit(0);
      this.progress = 0;
      return;
    }
    this.progress = this.progress + value;
    this.valueOut.emit(this.progress);
  }

  onChange(value: number) {
    if (value >= 100) {
      this.valueOut.emit(100);
    } else if (value <= 0) {
      this.valueOut.emit(0);
    } else {
      this.valueOut.emit(this.progress);
    }
  }

}
