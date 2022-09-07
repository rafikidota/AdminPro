import { Component, OnInit } from '@angular/core';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import sweetalert from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html'
})
export class HospitalsComponent implements OnInit {

  public total: number = 0;
  public hospitals: Hospital[] = [];

  public loaded: boolean = false;
  public searching: boolean = false;

  public skip: number = 0;
  public limit: number = 5;

  public currentPage: number = 1;
  public totalPage: number = 0;

  constructor(
    private hs: HospitalService,
    private ss: SearchService,
    private ims: ImageModalService,
  ) { }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals() {
    this.loaded = false;
    if(this.totalPage===1){
      this.skip = 0;
    }
    this.hs.getHospitals(this.skip, this.limit).subscribe({
      next: (res) => {
        if (res.ok) {
          this.hospitals = res.hospitals!;
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
    this.validateCurrentPage();
    this.getHospitals();
  }

  validateCurrentPage() {
    if (this.currentPage === 0) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPage) {
      this.currentPage = this.totalPage;
    }
  }

  updatePaginationValues() {

    this.totalPage = Math.trunc(this.total / this.limit);
    const remainder = this.total % this.limit;
    if (remainder > 0) {
      this.totalPage++;
    }
    this.validateCurrentPage();

  }

  search(query: string) {
    if (!query) {
      this.searching = false;
      return this.getHospitals();
    }
    this.ss.searchByCollection('users', query).subscribe(res => {
      if (res.ok) {
        this.hospitals = res.data!;
        this.total = res.data!.length;
        this.totalPage = 1;
        this.searching = true;
      }
    });
  }

  update(hospital: Hospital) {

  }

  delete(hospital: Hospital) {

    if (this.hospitals.length === 1) {
      this.skip -= 5;
    }
    return sweetalert.fire({
      title: 'Are you sure?',
      text: `Do you really wanna delete ${hospital.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hs.delete(hospital).subscribe({
          next: (res) => {
            if (res.ok) {
              sweetalert.fire(
                'Deleted!',
                `The user ${hospital.name} has been deleted successfully.`,
                'success'
              )
              this.getHospitals();
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

  openModal(hospital: Hospital) {
    this.ims.openModal('users', hospital.id!, hospital.img!);
  }

}
