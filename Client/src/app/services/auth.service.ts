import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal(!!localStorage.getItem("user")); // Persistent auth state

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (username.trim() !== "" && password === "Robis@123") {
      this.isAuthenticated.set(true);
      localStorage.setItem("token", "1")
      localStorage.setItem("user", username);
      console.log("Login successful! Navigating to /items...");
      this.router.navigate(['/items']);
    }
  }

  logout() {
    localStorage.removeItem("token"); // Clear session storage
    this.isAuthenticated.set(false);
    localStorage.removeItem("user"); // Clear session storage
    this.router.navigate(['/login']); // Redirect to login
  }

  canActivate(): boolean {
    if (!(localStorage.getItem("token") === "1")) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
