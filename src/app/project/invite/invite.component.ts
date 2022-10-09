import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChipsListComponent } from 'src/app/shared/chips-list/chips-list.component';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  @Input() members:Array<string> =[]
  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private dialogRef: MatDialogRef<InviteComponent>) { }
  @ViewChild("chiplist") chiplist!:ChipsListComponent
  ngOnInit(): void {

    if(this.data?.members){
      this.members = [...this.data.members];
    }
  }

  displayUser(user:{id:string; name:string}){
      return user? user.name : '';

  }

  OnSave(){

    console.log("eveve",this.chiplist.pinnedOnChip);  
    this.dialogRef.close(this.chiplist.pinnedOnChip)  
  }

}
