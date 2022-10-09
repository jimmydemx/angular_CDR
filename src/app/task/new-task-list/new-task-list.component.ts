import { AfterViewInit, ChangeDetectorRef, Component, Inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, NgControl, NgModel, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit, AfterViewInit{
  ProjectTitle='';
  public title="";
  @ViewChild("input") title$!:NgModel
  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private dialogRef: MatDialogRef<NewTaskListComponent>,private cd:ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.title$.control.setValidators([Validators.required]);
    this.cd.detectChanges()
     
  }

  ngOnInit(): void {
    this.title=this.data.title;
  }



  onClick(){
    if(!this.title$.invalid){
      this.dialogRef.close(this.ProjectTitle);
    }
   

  }

}
