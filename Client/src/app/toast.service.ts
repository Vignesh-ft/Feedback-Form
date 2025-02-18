import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})

export class ToastService {
  timer:number
  duplicates: boolean = false
  openDuplicates: boolean = false
  constructor(private toast:MessageService){
    this.timer = 2500
  }

  success(title:string, message:string){
    this.toast.add({
      severity:'success',
      summary:title,
      detail: message,
      life: this.timer,

    },)
  }

  info(title:string, message:string,){
    this.toast.add({
      severity:'info',
      summary:title,
      detail: message,
      life: this.timer
    })
  }

  warn(title:string, message:string,){
    this.toast.add({
      severity:'warn',
      summary:title,
      detail: message,
      life: this.timer
    })
  }

  error(title:string, message:string,){
    this.toast.add({
      severity:'error',
      summary:title,
      detail: message,
      life: this.timer
    })
  }

  secondary(title:string, message:string,){
    this.toast.add({
      severity:'secondary',
      summary:title,
      detail: message,
      life: this.timer
    })
  }

  contrast(title:string, message:string,){
    this.toast.add({
      severity:'contrast',
      summary:title,
      detail: message,
      life: this.timer
    })
  }

}
