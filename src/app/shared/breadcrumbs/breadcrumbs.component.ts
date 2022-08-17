import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title: string = '';
  public routeData!: Subscription;

  constructor(
    private router: Router
  ) {
    this.getRouteData();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.routeData.unsubscribe();
  }

  getRouteData() {
    this.routeData = this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      )
      .subscribe(data => {
        this.title = data['title'];
        document.title = `AdminPro - ${this.title}`;
      });
  }


}
