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
  input:string = ""

  @Output() outputEmit = new EventEmitter<any>();

  sendValue(event:any) {
    const target = event.target as HTMLInputElement;
    this.input = target.value;
    let emitt = {
      assign : this.assignee,
      value: this.input
    }
    this.outputEmit.emit(emitt);
  }


}
