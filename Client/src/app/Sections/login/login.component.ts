import { Component } from '@angular/core';
import { InputComponent } from "../../Components/input/input.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../toast.service';

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

  usernameError:boolean = false
  passwordError:boolean = false
  clear:boolean = false

  constructor(private router:Router, private authService:AuthService, private toast:ToastService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(localStorage.getItem("token") === "1") {
      this.router.navigate(['/items']);
    }
  }

  getInput(event:any) {
    if(event.assign === "username") {
      this.username = event.value
      this.usernameError = false
      // console.log(this.username);
      return
    }

    if(event.assign === "password") {
      this.password = event.value
      this.passwordError = false
      // console.log(this.password);
      return
    }
  }


  validate() {

    if(this.username === "") {
      this.usernameError = true
      this.toast.warn("Warning", "Username is Empty")
      return
    }

    if(this.password === "") {
      this.passwordError = true
      this.toast.warn("Warning", "Password is Empty")
    }

    if(this.password !== "Robis@123") {
      this.passwordError = true
      this.toast.warn("Warning", "Wrong Password, Try Again.")
    }

    this.authService.login(this.username, this.password);
  }
}
