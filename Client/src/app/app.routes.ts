import { Routes } from '@angular/router';
import { LoginComponent } from './Sections/login/login.component';
// import { AuthGuard } from './Sections/auth.guard';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';


export const routes: Routes = [
  { path: '', title: "Login" ,component: LoginComponent }, // Default route
  { path: 'items', title: "Items" ,loadComponent: () => import("./Sections/items/items.component").then(m => m.ItemsComponent), canActivate:[() => inject(AuthService).canActivate()] },
  { path: '**', title: "Login", redirectTo: ""} // Wildcard for 404 pages
];
