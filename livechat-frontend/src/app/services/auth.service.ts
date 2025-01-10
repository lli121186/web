import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService, private router: Router) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    this.authStatus.next(!this.jwtHelper.isTokenExpired(token));
  }

  login(credentials: { username: string; password: string }) {
    return this.api.post('auth/login', credentials).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.authStatus.next(true);
      this.router.navigate(['/chat']);
    });
  }

  register(data: { username: string; password: string }) {
    return this.api.post('auth/register', data);
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated() {
    return this.authStatus.asObservable();
  }
}
