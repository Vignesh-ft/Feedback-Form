import { Component } from '@angular/core'
import * as itemCode from "../../../app/variables/Item_code.json"
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TitleComponent } from '../../Components/title/title.component';
import { InputComponent } from '../../Components/input/input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [SidebarComponent, TitleComponent, InputComponent, FormsModule, CommonModule, LoadingComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  title = 'Form';

  reponse:any

  constructor(private api:ApiService){

  }


  ngOnInit(): void {
    this.reponse = this.api.fetchData("items", {user: localStorage.getItem('user')})
  }

  partNumber:string = ""
  dd:string = ""

  data = itemCode

  getInput(event:any) {
    if(event.assign === "partNumber") {
      this.partNumber = event.value
    }
  }

  getDD(event:any) {
    if(event.assign === "partNumber") {
      this.dd = event.value
    }
  }

}
