import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHomeComponent } from './task/task-home/task-home.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: "full"},
  {path:'project', redirectTo: '/project', pathMatch: "full"},
  {path:'tasks',  redirectTo: '/project', pathMatch: "full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
