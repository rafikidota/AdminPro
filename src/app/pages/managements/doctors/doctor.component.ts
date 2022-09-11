import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import sweetalert from 'sweetalert2';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected?: Hospital;
  public doctorSelected?: Doctor;

  constructor(
    private fb: FormBuilder,
    private hs: HospitalService,
    private ds: DoctorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    });
    this.getHospitals();
    this.doctorForm.get('hospital')?.valueChanges.subscribe(hospital_id => {
      this.hospitalSelected = this.hospitals.find(h => h.id === hospital_id);
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
    
    const doctor = this.doctorForm.value;
    this.ds.create(doctor).subscribe({
      next:(res)=>{
        console.log(res);
        sweetalert.fire('Create',`${doctor.name} created succesfully`,'success');
        this.router.navigateByUrl(`/dashboard/doctor/${res.doctor?.id}`)
      },
      error:(err)=>{

      }
    });
  }

}
