import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  public title= "New Task";
  priorities =[
    {
      label:"urgent",
      value: 1

    },
    {
      label:"important",
      value: 2

    },
    {
      label:"normal",
      value: 3

    }
  ]
 
  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { }

  
  ngOnInit(): void {

    this.title = this.data.title;
  }

  ngAfterViewInit(){


    //this.title = this.data.title;
  }


  onClick() {


  }
}
