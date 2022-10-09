import { Component, Renderer2, OnInit, QueryList, ViewChildren,HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { result } from 'lodash';
import { map, Observable, take } from 'rxjs';
import { routeAnim } from 'src/app/animation/route.anim';
import { Project, taskList } from 'src/app/domain';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { getTaskLists, getTaskListsOrder, RootState } from 'src/app/store';
import { TASKLIST_ADD, TASKLIST_DELETE, TASKLIST_LOAD, TASKLIST_UPDATE } from 'src/app/store/actions/task-list.action';
import { taskListsState } from 'src/app/store/reducers/task-list.reducer';
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
  project!:Project | undefined

  tasklist$!:  Observable<taskList[] | undefined>

  constructor(rd2:Renderer2,private mdialog: MatDialog, private store$:Store<RootState>,private router:Router, private rou: ActivatedRoute) { 
  if(this.router.getCurrentNavigation()?.extras.state){
    this.project = this.router.getCurrentNavigation()?.extras?.state as Project
  }

  if(this.project){
    this.store$.dispatch(TASKLIST_LOAD(this.project))
  }
  this.tasklist$ = this.store$.select(getTaskLists)
  
  
  }

  ngOnInit(): void {

    // router 传递的值
    var reg =/.*\/(.*)/
    var string;
    if(this.router.url.match(reg) ){
    string =this.router.url.match(reg)
    }
    //string?.[1]
  //  this.tasklist$ = this.store$.select(TASKLIST_LOAD(string?.[1]))
    console.log("private rotuer", this.router.getCurrentNavigation()?.extras.state);
    
    
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
    const dialogRef = this.mdialog.open(NewTaskComponent,{data:{title:"New Task"}});

     dialogRef.afterClosed().subscribe(result=>{

           })


  }


  launchCopyTaskDialog(){
    console.log("launchCopyTaskDialog");
    const dialogRef = this.mdialog.open(CopyTaskComponent,{data: {lists:this.lists}});

  }
  launchUpdateTaskDialog(task:any){
    console.log("task");
    this.mdialog.open(NewTaskComponent,{data:{title: "Edit Task", task: task}})

  }
  launchConfirmDialog(list:taskList){
    const dialogRef = this.mdialog.open(ConfirmDialogComponent, {data:{title: "Confirm", content:"Delete the task"}})
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.store$.dispatch(TASKLIST_DELETE(list))
      }

    })
  }
  launchEditListDialog(list:taskList){
    const dialogRef = this.mdialog.open(NewTaskListComponent, {data:{title: "Update task List"}})
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        console.log(list);
        var list_c = {...list}
        list_c.name = result;
        this.store$.dispatch(TASKLIST_UPDATE(list_c))
      }
     
      })
  }

  launchNewListDialog(){
    const dialogRef = this.mdialog.open(NewTaskListComponent, {data:{title: "Create New Task List"}})
    dialogRef.afterClosed().subscribe(result=>{
      debugger;
      // create a tasklist 
      var a =this.project?.id
      var thisorder:number=0
      this.store$.select(getTaskListsOrder).pipe(take(1)).subscribe(order=>{
        if(order){
         thisorder = Math.max(...order)+1
        }else{
          thisorder =1
        }
      });
      
    
      var taskList :taskList ={
        id: null,
        name: result,
        order:thisorder,
        ...this.project?.id&&{projectId:this.project?.id},
        taskIds:[]
      }
      console.log("tasklIst",taskList);
      
      if(result){
        this.store$.dispatch(TASKLIST_ADD(taskList))
      }





      
    })

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
