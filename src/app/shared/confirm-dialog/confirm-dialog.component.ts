import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title!:'';
  content!:'';
  
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;

  }

  onClick(result: boolean){
    
    this.dialogRef.close(result);

  }

}
