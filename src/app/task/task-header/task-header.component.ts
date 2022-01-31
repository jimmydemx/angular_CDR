import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header:string='';
  @Output() createNewTask: EventEmitter<void> = new EventEmitter<void>();
  @Output() moveAll : EventEmitter<void> = new EventEmitter<void>(); 
  @Output() delList : EventEmitter<void> = new EventEmitter<void>(); 
  @Output() editList : EventEmitter<void> = new EventEmitter<void>(); 
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {

   // console.log(this.header);
   //  console.log(TaskHeaderComponent);
    
  }


  onClickNewTask() {
    console.log("onClickNewTask");
    this.createNewTask.emit();

  }

  onEditListClick(){
    console.log("onEditListClick");
    this.editList.emit();
    
  }

  OnClicktoMove(){
    console.log("OnclickMove")
    this.moveAll.emit();
  }

  onDelListClick(){
    console.log("onDelListClick");
    this.delList.emit();

  }

}
