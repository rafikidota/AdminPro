import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import sweetalert from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit {

  public total: number = 0;
  public doctors: Doctor[] = [];

  public loaded: boolean = false;
  public searching: boolean = false;

  public skip: number = 0;
  public limit: number = 5;

  public currentPage: number = 1;
  public totalPage: number = 0;

  private imageSubs!: Subscription;

  constructor(
    private ss: SearchService,
    private ims: ImageModalService,
    private ds: DoctorService,
  ) { }

  ngOnInit(): void {
    this.getDoctors();
    this.imageSubs = this.ims.newImage
      .pipe(
        delay(100)
      ).subscribe(() => this.getDoctors());
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }


  getDoctors() {
    this.loaded = false;
    if(this.totalPage===1){
      this.skip = 0;
    }
    this.ds.getDoctors(this.skip, this.limit).subscribe({
      next: (res) => {
        if (res.ok) {
          this.doctors = res.doctors!;
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
    this.getDoctors();
  }
  
  validateCurrentPage(){
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
      return this.getDoctors();
    }
    this.ss.searchByCollection('doctors', query).subscribe(res => {
      if (res.ok) {
        this.doctors = res.data!;
        this.total = res.data!.length;
        this.totalPage = 1;
        this.searching = true;
      }
    });
  }

  async delete(doctor: Doctor) {

    if (this.doctors.length===1) {
      this.skip -= 5;
    }
    return sweetalert.fire({
      title: 'Are you sure?',
      text: `Do you really wanna delete ${doctor.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.delete(doctor).subscribe({
          next: (res) => {
            if (res.ok) {
              sweetalert.fire(
                'Deleted!',
                `The doctor ${doctor.name} has been deleted successfully.`,
                'success'
              )
              this.getDoctors();
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

  openModal(doctor: Doctor) {
    this.ims.openModal('doctors', doctor.id!, doctor.img!);
  }

}
