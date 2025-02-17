import { Routes } from '@angular/router';
import { LoginComponent } from './Sections/login/login.component';
import { ItemsComponent } from './Sections/items/items.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: '', title: "Login" ,component: LoginComponent, canActivate:[AuthService] }, // Default route
  { path: 'items', title: "Items" ,component: ItemsComponent, canActivate:[AuthService] },
  { path: '**', title: "Login", redirectTo: ""} // Wildcard for 404 pages
];
