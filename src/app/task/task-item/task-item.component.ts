import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { ItemAnim } from 'src/app/animation/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations:[
    ItemAnim
  ]
})
export class TaskItemComponent implements OnInit {
  @Input() item!:any;
  @Input() avatar!:any;
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in';

  constructor() { }

  ngOnInit(): void {

    this.avatar= this.item.owner? this.item.owner.avatar: 'unassigned';
  }
  onItemClick(){
    console.log("onItemClick");
    this.taskClick.emit();

  }
  OnCheckBoxClick(ev:any){
    ev.stopPropagation();
  }

  @HostListener('mouseover')
  onMouseover(){
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  onMouseleave(){
    this.widerPriority = 'in';
  }

}
