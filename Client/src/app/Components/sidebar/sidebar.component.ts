import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from "../title/title.component";
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  body:any
  logOutState:boolean = false

  constructor(private auth:AuthService, private toast:ToastService) {

  }

  logout() {
    this.toast.success("Success",  `${localStorage.getItem("user")} logged Out!`)
    this.auth.logout()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.body = {name: localStorage.getItem('user')}
  }
}
