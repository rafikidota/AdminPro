import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(
    private ss: SettingsService
  ) { }

  ngOnInit(): void {
    // customInsitFunctions();
  }

}
