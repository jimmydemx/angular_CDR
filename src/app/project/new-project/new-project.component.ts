
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  
  public title='';

  constructor(@Inject(MAT_DIALOG_DATA) private data:any, 
  private dialogRef: MatDialogRef<NewProjectComponent>,

  ) { 

  }

  ngOnInit(): void {
    this.title= this.data.title;
    console.log(JSON.stringify(this.data));
    // this.oc.themeClass = this.data.dark? "unicorn-dark-theme":null;
  }
  onClick(){
    this.dialogRef.close('I received your message');


  }

}
