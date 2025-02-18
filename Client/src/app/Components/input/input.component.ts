import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() title:string = ""
  @Input() placeHolder:string = ""
  @Input() assignee:string = ""
  @Input() typeSearch:boolean = false
  @Input() filteredData:any
  @Input() isError:boolean = false
  @Input() type:string = ""
  @Input() clear:any
  @Input() isClear:boolean = false
  @Input() inputMode:string = "text"

  openDialog:boolean = false

  input:string = ""

  @Output() outputEmit = new EventEmitter<any>();

  clearFn() {
    this.input = ""
    if(!this.input) {
      console.log(this.assignee, "Cleared");

    }
  }

  sendValue(event:any) {
    const target = event.target as HTMLInputElement;
    this.input = target.value;
    let emitt = {
      assign : this.assignee,
      value: this.input
    }
    this.outputEmit.emit(emitt);
  }

  dialogFn(assign:any) {
    this.openDialog = !this.openDialog
    console.log(assign);

    if(this.openDialog && assign === "partNumber") {
      this.outputEmit.emit("filter_part")
    }

    if(this.openDialog && assign === "binNumber") {
      this.outputEmit.emit("filter_bin")
    }
  }

  changeInputValue(item:any) {
    this.input = item
    let emitt = {
      assign : this.assignee,
      value: this.input
    }
    this.outputEmit.emit(emitt);
    this.openDialog = false
  }




}
