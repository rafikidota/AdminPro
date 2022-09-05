import { Component, OnDestroy, OnInit } from '@angular/core';
import sweetalert from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';
import { AuthService } from '../../../services/auth.service';
import { ImageModalService } from '../../../services/image-modal.service';
import { delay, Subscription } from 'rxjs';
import { EditUserModalService } from '../../../services/edit-user-modal.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  public total: number = 0;
  public users: User[] = [];

  public loaded: boolean = false;
  public searching: boolean = false;

  public skip: number = 0;
  public limit: number = 5;

  public currentPage: number = 1;
  public totalPage: number = 0;

  public imageSubs!: Subscription;
  public editUserSubs!: Subscription;


  constructor(
    private us: UserService,
    private ss: SearchService,
    private as: AuthService,
    private ims: ImageModalService,
    public eums: EditUserModalService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.imageSubs = this.ims.newImage
      .pipe(
        delay(100)
      ).subscribe(() => this.getUsers());
    this.editUserSubs = this.eums.userUpdatedEE.subscribe(()=> this.getUsers());
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
    this.editUserSubs.unsubscribe();
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

  search(query: string) {
    if (!query) {
      this.searching = false;
      return this.getUsers();
    }
    this.ss.searchByCollection('users', query).subscribe(res => {
      if (res.ok) {
        this.users = res.data!;
        this.total = res.data!.length;
        this.totalPage = 1;
        this.searching = true;
      }
    });
  }

  update(user: User){
    this.eums.userEE.emit(user);
    this.eums.openModal();
  }

  delete(user: User) {

    if (user.id === this.as.user.id) {
      return sweetalert.fire('Error', `You can't delete yourself`, 'error');
    }

    return sweetalert.fire({
      title: 'Are you sure?',
      text: `Do you really wanna delete ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.us.delete(user).subscribe({
          next: (res) => {
            if (res.ok) {
              sweetalert.fire(
                'Deleted!',
                `The user ${user.name} has been deleted successfully.`,
                'success'
              )
              this.getUsers();
            }
          },
          error: (err) => {
            if (err.status === 0) {
              sweetalert.fire('Error', 'No se ha podido establecer una conexión con el servidor', 'error');
            } else {
              sweetalert.fire('Error', err.error.msg, 'error');
            }
          }
        });
      }
    })

  }

  changeRole(user: User) {
    this.us.update(user).subscribe({
      next: (res) => {

      },
      error: (err) => {
        if (err.status === 0) {
          sweetalert.fire('Error', 'No se ha podido establecer una conexión con el servidor', 'error');
        } else {
          sweetalert.fire('Error', err.error.msg, 'error');
        }
      }
    });
  }

  openModal(user: User) {
    this.ims.openModal('users', user.id!, user.img!);
  }

}
