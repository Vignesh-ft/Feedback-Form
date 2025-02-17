import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() title:string = ""
  @Input() placeHolder:string = ""
  @Input() assignee:string = ""
  @Input() ddOptions:any = [
    {
      name:"asdasd"
    },
    {
      name:"asdasd"
    },
    {
      name:"asdasd"
    },
    {
      name:"asdasd"
    },
    {
      name:"asdasd"
    },

  ]


  @Output() outputEmit = new EventEmitter()

  ddValue:string = ""
  ddState:boolean = false

  ngOnInit(): void {
    this.ddValue = this.placeHolder
  }

  changedd(name:any) {
    this.ddState = false
    console.log(this.ddState);

    this.ddValue = name
    this.outputEmit.emit({assign: this.assignee, value: name})
  }


}
