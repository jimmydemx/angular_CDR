import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from '../project/project-list/project-list.component';
import { TaskHomeComponent } from '../task/task-home/task-home.component';


const routes: Routes = [
    {path:'projects', component: ProjectListComponent },
    {path:'tasklists', component:   TaskHomeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }