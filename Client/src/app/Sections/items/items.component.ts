import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import * as itemCode from "../../../app/variables/Item_code.json"
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TitleComponent } from '../../Components/title/title.component';
import { InputComponent } from '../../Components/input/input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [SidebarComponent, TitleComponent, InputComponent, FormsModule, CommonModule, LoadingComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {

  @ViewChildren(InputComponent) childInput!:  QueryList<InputComponent>

  title = 'Form';

  responsePartNumber:any = {}
  responseBinNumber:any = {}
  showDataPart:any
  showDataBin:any
  isLoading:boolean = false
  apiCalls:number = 0
  clear:boolean = false
  logOutState:boolean = false
  submissionStatus:any = {
    show: false,
    response: false
  }

  body:any = {name: localStorage.getItem('user')}

  constructor(private api:ApiService, private auth:AuthService){

  }


  ngOnInit(): void {
    this.isLoading = true
   this.responsePartNumber = this.apiCall("items")
   this.responseBinNumber = this.apiCall("bin_number")
  }


  /**
   * logout Function
   */
  logout() {
    this.auth.logout()
  }


  /**
   * Does the API call from the Service
   */
  apiCall(endPoint:any):any {
    this.api.fetchData(endPoint, this.body).subscribe((res:any)=> {
      if(res) {

        if(endPoint === "items") {
          this.responsePartNumber = res
          this.apiCalls +=1
        }
        else if(endPoint === "bin_number") {
          this.responseBinNumber = res
          this.apiCalls +=1
        }

        if(this.apiCalls === 2){
          this.isLoading = false
        }
        console.log("Data Fetched", endPoint, res);
      }
      return res
    })
  }

  partNumber:string = ""
  quantity:number = -1
  binNumber:string = ""

  partNumberError:boolean = false
  quantityError:boolean = false
  binNumberError:boolean = false


  dd:string = ""

  data = itemCode

  getInput(event:any) {

    if(event === "filter_part") {
      // console.log("Started Filtering Part Number....", this.responsePartNumber);
      this.dataFilter(this.partNumber, event)
    }

    if(event === "filter_bin") {
      // console.log("Started Filtering Part Number....", this.responsePartNumber);
      this.dataFilter(this.binNumber, event)
    }

    if(event.assign === "partNumber") {
      this.partNumber = event.value
      // console.log(this.partNumber)
    }

    if(event.assign === "binNumber") {
      this.binNumber = event.value
      // console.log(this.binNumber);
    }


    if(event.assign === "quantity") {
      this.quantity = event.value
      // console.log(this.quantity);
    }
  }

  getDD(event:any) {
    if(event.assign === "partNumber") {
      this.dd = event.value
    }
  }


  /**
   * data need to be passed for the condition checking and the data is filtered based on the condition
   * @param cond stands for Condition
   */
  dataFilter(cond:any, dataFor:any) {

    if(dataFor === "filter_part") {
      this.showDataPart = this.responsePartNumber.data.filter((item:any) =>
        item.toLowerCase().includes(cond.toLowerCase())
      );
      return
    }

    if(dataFor === "filter_bin") {
      this.showDataBin = [
        ...new Set(
          this.responseBinNumber.data
            .filter((item: any) => item.toLowerCase().includes(cond.toLowerCase()))
        )
      ];

      return
    }



    console.log(cond, this.responsePartNumber.data, this.showDataPart);

  }


  /**
   * Clear all Value
   */
  clearFn() {
    console.log("Clearing");
    if(this.childInput) {
      this.childInput.forEach((child:any) => {
        child.clearFn()
      });
    }
  }



  /**
   * Submit and Validation function,
   * @returns
   */
  submitData() {

    const date = new Date()

    console.log(date);

    let time = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let actualDate = `${year}-${month}-${day}`
    let actualTime = `${time}:${minutes}:${seconds}`

    console.log(actualDate, actualTime);

    this.quantity = Number(this.quantity)



    if(typeof this.partNumber !== "string" || this.partNumber.trim() === "") {
      this.partNumberError = true
      setTimeout(()=> {
        this.partNumberError = false
      }, 1000)
      return
    }

    if(typeof this.quantity !== "number" || this.quantity <= 0) {
      this.quantityError = true
      setTimeout(()=> {
        this.quantityError = false
      }, 1000)
      return
    }

    if(typeof this.binNumber !== "string" || this.binNumber.trim() === "") {
      this.binNumberError = true
      setTimeout(()=> {
        this.binNumberError = false
      }, 1000)
      return
    }


    this.isLoading = true
    let body = {
      name: this.body.name,
      date: actualDate,
      time: actualTime,
      item_code: this.partNumber.toUpperCase(),
      quantity: this.quantity,
      bin_number: this.binNumber.toUpperCase()
    }
    this.api.fetchData('stores',body).subscribe((res:any) => {
      console.log(res);

      this.submissionStatus = {
        show: true,
        response: res.uploaded
      }

      if(res.uploaded === true){
        this.clearFn()
        setTimeout(()=> {
          this.isLoading = false
        },500)
        this.partNumber = ""
        this.quantity = -1
        this.binNumber = ""
        this.submission()
      }
      else{
        this.submission()
      }
    })
  }

  submission() {
    setTimeout(() => {
      this.submissionStatus = {
        show: false,
        response: false
      }
    },2500)
  }



}
