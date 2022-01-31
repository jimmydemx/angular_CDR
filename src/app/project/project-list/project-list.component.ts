import { Component, Input, OnInit,HostBinding,ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListAnim } from 'src/app/animation/list.anim';
import { routeAnim } from 'src/app/animation/route.anim';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations:[routeAnim,ListAnim],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnim') state="void";


  projects = [
    { 
      'id':1,
      "name": "Cooperative Plataform",
      'desc':" This is a project",
      "coverImg":"assets/img/covers/0.jpg"
    },

    {
      'id':2,
      "name": "Cooperative Plataform",
      'desc':" This is a project",
      "coverImg":"assets/img/covers/1.jpg"
    }
  ]

  constructor(private dialog: MatDialog) { }



  ngOnInit(): void {
    
  }


  openNewProjectDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title: "New Project"},position:{left:"0"},width:"400px",height:"400px"});
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      this.projects=[...this.projects, {id:3, "name": "new proj",'desc':" This is a ew project", "coverImg":"assets/img/covers/8.jpg"}]

    });
  }


  launchInviteDialog() {
     const dialogRef = this.dialog.open(InviteComponent);
  }

  launchEditDialog() {
      console.log("launchEditDialog");
      const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:'Edit Project'}})
  }

  launchDeleteDialog(project:any){
    console.log("launchDeleteDialog");
    const dialogRef= this.dialog.open(ConfirmDialogComponent,{data:{title:"Confirmation", content:"Delete this Project?"}})
    dialogRef.afterClosed().subscribe(result=> {
      console.log(result);
      this.projects= this.projects.filter(p=>p.id!==project.id)
    
    
    })
  }
}
