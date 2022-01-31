import { Component, Renderer2, OnInit, QueryList, ViewChildren,HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { routeAnim } from 'src/app/animation/route.anim';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { comps } from 'src/app/utils/comps';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskListComponent } from '../task-list/task-list.component';




@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations:[routeAnim]
})
export class TaskHomeComponent implements OnInit {

  @ViewChildren('appTaskList') appTaskList!: QueryList<TaskListComponent>;
  @comps() c="123";
  @HostBinding('@routeAnim') state="void";
  
  lists = [

    {
      id:1,
      order:1,
      name:"finished",
      tasks:[
        {
          id:1,
          desc: 'task 1: buy salt',
          completed:true,
          priority: 3,
          owner: {
            id: 1,
            name:"张三",
            avatar:'avatars:svg-12'
          },
          dueDate: new Date()
        },
        {
          id:2,
          desc: 'task 2: buy pear',
          completed:false,
          priority: 2,
          owner: {
            id: 1,
            name:"张三",
            avatar:'avatars:svg-10'
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
      ]
    },
    {
      id:2,
      order:2,
      name:"pending",
      tasks:[
        {
          id:1,
          desc: 'task 1: buy coffee',
          completed:false,
          priority: 1,
          owner: {
            id: 1,
            name:"张三",
            avatar:'avatars:svg-3'
          },
          dueDate: new Date()
        },
        {
          id:2,
          desc: 'task 2: buy milk',
          completed:false,
          priority: 2,
          owner: {
            id: 1,
            name:"张三",
            avatar:'avatars:svg-1'
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id:3,
          desc: 'task 1: buy suger',
          completed:false,
          priority: 1,
          owner: {
            id: 1,
            name:"王五",
            avatar:'avatars:svg-10'
          },
          dueDate: new Date()
        }

      ]
    }
  ]

  constructor(rd2:Renderer2,private mdialog: MatDialog) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.appTaskList.forEach(item=>{
      console.log("123",item);
    });
   console.log("45c",this.c);

  }


  openNewProjectDialog(){

  }

  launchNewTaskDialog(){

    console.log("q23424");
     this.mdialog.open(NewTaskComponent,{data:{title:"New Task"}});
  }


  launchCopyTaskDialog(){
    console.log("launchCopyTaskDialog");
    const dialogRef = this.mdialog.open(CopyTaskComponent,{data: {lists:this.lists}});

  }
  launchUpdateTaskDialog(task:any){
    console.log("task");
    this.mdialog.open(NewTaskComponent,{data:{title: "Edit Task", task: task}})

  }
  launchConfirmDialog(){
    const dialogRef = this.mdialog.open(ConfirmDialogComponent, {data:{title: "Confirm", content:"Delete the task"}})
    dialogRef.afterClosed().subscribe(result=>console.log(result))
  }
  launchEditListDialog(){
    const dialogRef = this.mdialog.open(NewTaskListComponent, {data:{title: "Update task List"}})
    dialogRef.afterClosed().subscribe(result=>console.log(result))
  }

  launchNewListDialog(){
    const dialogRef = this.mdialog.open(NewTaskListComponent, {data:{title: "Create task List"}})
    dialogRef.afterClosed().subscribe(result=>console.log(result))

  }

  handleMove(srcData:any,list:any){
    switch(srcData.tag){
      case 'task-item':
        console.log("hanling item");
        break;
      case 'task-list':
        console.log("handling list");
        const srcList =srcData.data;
        const temOrder = srcList.order;
        srcList.order= list.order;
        list.order   =temOrder;
        break;
        
        

    }

  }

}
