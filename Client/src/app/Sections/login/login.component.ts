import { Component } from '@angular/core';
import { InputComponent } from "../../Components/input/input.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username:string = ""
  password:string = ""
  constructor(private router:Router, private authService:AuthService) {

  }

  getInput(event:any) {
    if(event.assign === "username") {
      this.username = event.value
      console.log(this.username);
      return
    }

    if(event.assign === "password") {
      this.password = event.value
      console.log(this.password);
      return
    }
  }


  validate() {
    this.authService.login(this.username, this.password);
  }
}
