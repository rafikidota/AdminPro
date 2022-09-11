import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import sweetalert from 'sweetalert2';
import { Doctor, DoctorHospital } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected?: DoctorHospital;
  public doctorSelected?: Doctor;

  constructor(
    private fb: FormBuilder,
    private hs: HospitalService,
    private ds: DoctorService,
    private router: Router,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.ar.params.subscribe(({ id }) => {
      if (id !== 'new') {
        this.getDoctor(id)
      }
    });
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    });
    this.getHospitals();
    this.doctorForm.get('hospital')?.valueChanges.subscribe(hospital_id => {
      const hospital = this.hospitals.find(h => h.id === hospital_id);
      this.hospitalSelected = {
        _id: hospital?.id!,
        name: hospital?.name!,
        user: hospital?.user!,
        img: hospital?.img
      };
    });
  }

  getDoctor(id: string) {
    this.ds.getDoctorByID(id)
      .pipe(
        delay(100)
      )
      .subscribe({
        next: (res) => {
          this.doctorSelected = res.doctor;
          this.hospitalSelected = res.doctor?.hospital;
          this.doctorForm = this.fb.group({
            name: [this.doctorSelected?.name!, [Validators.required]],
            hospital: [this.hospitalSelected?._id, [Validators.required]],
          });
        },
        error: (err) => {
          console.log(err);
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }
      });
  }

  getHospitals() {
    this.hs.getHospitals().subscribe({
      next: (res) => {
        this.hospitals = res.hospitals!;
      },
      error: () => {

      }
    });
  }

  save() {

    const { name, hospital } = this.doctorForm.value;
    const user: any = this.doctorSelected?.user?._id!;
    if (this.doctorSelected!) {
      const newDoctor = new Doctor(name, hospital, this.doctorSelected.id, user, this.doctorSelected.img);
      this.ds.update(newDoctor).subscribe({
        next: (res) => {
          sweetalert.fire('Update', `${name} updated succesfully`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${res.doctor?.id}`);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      const doctor = this.doctorForm.value;
      this.ds.create(doctor).subscribe({
        next: (res) => {
          sweetalert.fire('Create', `${doctor.name} created succesfully`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${res.doctor?.id}`)
        },
        error: (err) => {

        }
      });
    }
  }

}

