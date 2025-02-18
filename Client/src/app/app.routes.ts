import { Routes } from '@angular/router';
import { LoginComponent } from './Sections/login/login.component';
import { ItemsComponent } from './Sections/items/items.component';


export const routes: Routes = [
  { path: '', title: "Login" ,component: LoginComponent }, // Default route
  { path: 'items', title: "Items" ,component: ItemsComponent },
  { path: '**', title: "Login", redirectTo: ""} // Wildcard for 404 pages
];
