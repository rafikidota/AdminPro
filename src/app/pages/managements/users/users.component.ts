import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  public total: number = 0;
  public users: User[] = [];
  public skip: number = 0;
  public limit: number = 5;
  public currentPage: number = 1;
  public totalPage: number = 0;
  public loaded: boolean = false;
  public searching: boolean = false;

  constructor(
    private us: UserService,
    private ss: SearchService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loaded = false;
    this.us.getUsers(this.skip, this.limit).subscribe({
      next: (res) => {
        if (res.ok) {
          this.users = res.users!;
          this.total = res.total!;
          this.loaded = true;
          this.updatePaginationValues();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  changePagination(value: number, pageChange: number) {
    this.skip += value;
    this.currentPage += pageChange;
    if (this.skip < 0) {
      this.skip = 0;
    }
    else if (this.skip > this.total) {
      this.skip -= value;
    }
    if (this.currentPage === 0) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPage) {
      this.currentPage = this.totalPage;
    }
    this.getUsers();
  }

  updatePaginationValues() {
    this.totalPage = ~~(this.total / this.limit);
    const remainder = this.total / this.limit;
    if (remainder !== 0) {
      this.totalPage++;
    }
  }

  search(query:string) {
    if(!query){
      this.searching = false;
      return this.getUsers();
    }
    this.ss.searchByCollection('users',query).subscribe( res => {
      if (res.ok) {
        this.users = res.data!;
        this.total = res.data!.length;
        this.totalPage = 1;
        this.searching = true;
      }
    });
  }

}
