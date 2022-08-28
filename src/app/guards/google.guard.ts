import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleGuard implements CanActivate, CanLoad {
  constructor(private as: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.as.signInWithGoogle().pipe(
      tap(valid => {
        if (valid) {
          this.router.navigateByUrl('/dashboard');          
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.as.signInWithGoogle().pipe(
      tap(valid => {
        if (valid) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
