import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import sweetalert from 'sweetalert2';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html'
})
export class GoogleComponent implements OnInit {  


  constructor(
    private as : AuthService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {


    (window as any).handleCredentialResponse = (response:any) => {
      const id_token = response.credential;
      this.as.signInWithGoogle(id_token).subscribe({
        next: (res) => {
          if (res === true) {
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/dashboard');
            });
          }
        },
        error: (err) => {
          sweetalert.fire('Error', err.error.msg, 'error');
        }
      });
    }

  }
  
}


