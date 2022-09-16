import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(
    private as: AuthService,
    private router: Router
  ) {

  }
  canActivate(): Observable<boolean> | boolean {
    if (this.as.role === 'ADMIN_ROLE') {
      return true
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
  canLoad(): Observable<boolean> | boolean {
    if (this.as.role === 'ADMIN_ROLE') {
      return true
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
