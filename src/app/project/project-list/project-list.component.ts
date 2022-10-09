import { Component, Input, OnInit,HostBinding, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListAnim } from 'src/app/animation/list.anim';
import { routeAnim } from 'src/app/animation/route.anim';
import { ProjectService } from 'src/app/services/project.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import * as _ from "lodash"
import { Project } from 'src/app/domain';
import { filter, map, Observable, switchMap, take, takeWhile, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetAllProjects, getAuthState, RootState } from 'src/app/store';
import * as PROJECT_ACTION from '../../store/actions/project.action'


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations:[routeAnim,ListAnim],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnim') state="void";


  projects:Project[]=[];
  projects$!: Observable<Project[]>;
  listAnim$!: Observable<number>;

  constructor(private dialog: MatDialog, private ProjectService: ProjectService,  private zone: NgZone,private cd:ChangeDetectorRef
    , private store$:Store<RootState>) {

    this.projects=[]
    this.store$.dispatch(PROJECT_ACTION.PROJECT_LOAD())
    this.store$.select(getAuthState).subscribe(v=>console.log("feffa",v))
    this.projects$ = this.store$.select(GetAllProjects);
    this.listAnim$ = this.projects$.pipe(map(p=>p.length))
    //  this.store$.select(GetAllProjects).subscribe({next:
    //   vals=>{
    //     debugger;
    //     vals?.forEach(project=>{
    //       this.projects?.push({
    //         name:project?.name,
    //         coverImg:project?.coverImg,
    //         id:project?.id,
    //         ...project?.desc&&{desc:project?.desc},
    //         ...project?.taskLists&&{taskLists:project?.taskLists},
    //         ...project?.members&&{members:project?.members},
    //       })
    //     })
    //   },
    //   error:err=>console.log(err),
    //   complete:()=>{
    //     console.log("compeleted load projects")}
    // })
    // this.cd.detectChanges()
   }

  ngOnInit(): void {
    
  }


  openNewProjectDialog(){

    const selectedImg = `/assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`
    const dialogRef = this.zone.run(()=>this.dialog.open(NewProjectComponent,{data:{title: "New Project",thumbNails:this.getThumbnails(),coverImg:selectedImg},position:{left:"40%"},width:"400px",height:"400px"}));
    dialogRef.afterClosed().subscribe({
      next:val=>{
        console.log("vak",val);
         if(val){
          this.store$.dispatch(PROJECT_ACTION.PROJECT_ADD(val))
         }
         
          // this.store$.select(GetAllProjects).subscribe(console.log)
          // this.projects= [...this.projects, {...val?.id&&{id:val?.id}||{id:"undefined"},name:val.name,...val?.desc&&{desc:val.desc}||{desc:"undefined"},coverImg:val.coverImg}]
        },
      error: error=>console.log("error",error),
      complete: ()=>console.log('completed')
      })
  }


  launchInviteDialog(project:Project) {
    // invite 那些 todo

    // get 所有的user 暂时不使用状态管理
      
     const dialogRef = this.dialog.open(InviteComponent,{data:{...project.members&&{members:project.members}}});
     dialogRef.afterClosed().subscribe(
      (val)=> {
        if(project.id && project.id!==null){
          this.store$.dispatch(PROJECT_ACTION.PROJECT_INVITE({projectID:project?.id,members:val}))
        }
        
  })
  }

  launchEditDialog(project:Project) {
      console.log("launchEditDialog");
      debugger;
      const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:'Edit Project',thumbNails:this.getThumbnails(),name:project.name, desc:project.desc,coverImg:project.coverImg,id:project.id}})
      dialogRef.afterClosed().subscribe({
        next:val=> {
          // debugger;
          this.store$.dispatch(PROJECT_ACTION.PROJECT_UPDATE(val))
          // this.cd.detectChanges()
        },
        error:error=>console.log(error),
        complete:()=>console.log("completed")
      })

  }

  launchDeleteDialog(project:any){
    console.log("launchDeleteDialog");
    const dialogRef= this.dialog.open(ConfirmDialogComponent,{data:{title:"Confirmation", content:"Delete this Project?"}})
    dialogRef.afterClosed().subscribe(result=> {

      console.log("after confirm Delete?",result,project);
      if(result){
            // this.projects= this.projects.filter(p=>p.id!==project.id)
            this.store$.dispatch(PROJECT_ACTION.PROJECT_DELETE(project))
      }
    })
  }

  getThumbnails(){
    return _.range(0,40).map(i=>`/assets/img/covers/${i}_tn.jpg`)
  }

  ngOnDestroy(){


  }
}
