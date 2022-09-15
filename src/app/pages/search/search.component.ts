import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];
  
  constructor(
    private ar: ActivatedRoute,
    private ss: SearchService
  ) { }

  ngOnInit(): void {
    this.ar.params.subscribe(({ query }) => this.search(query));
  }

  search(query: string) {
    this.ss.search(query).subscribe({
      next: (res) => {
        this.users = res.users!;
        this.hospitals = res.hospitals!;
        this.doctors = res.doctors!;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
