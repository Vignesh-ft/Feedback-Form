import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal(false);

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (username !== "" && password === "Robis@123") {
      this.isAuthenticated.set(true);
      localStorage.setItem("user",username)
      this.router.navigate(['/items']);
    } else {
      alert("Invalid credentials!");
    }
  }

  logout() {
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }


  canActivate() {
    return this.isAuthenticated
  }
}
