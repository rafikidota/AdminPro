import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs!: Subscription;

  constructor() {

    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe({
    //   next: (i) => console.log('tick', i),
    //   error: (e) => console.warn('Error:', e),
    //   complete: () => console.info('observer completed')
    // });

    this.intervalSubs = this.returnInterval()
      .subscribe(console.log);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval() {
    const interval$ = interval(100);
    return interval$.pipe(
      map(i => i + 1),
      filter(value => (value % 2 === 0) ? true : false),
      // take(10),
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          console.log('i = 2');
          observer.error('Error i = 2');
        }
      }, 1000);
    });
  }

}
