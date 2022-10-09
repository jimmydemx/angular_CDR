import { Component, EventEmitter, Input, OnInit, Output,HostBinding, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { cardAnim } from 'src/app/animation/card.anim';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {

  @Input() item:any;
  @Output() onInvite = new EventEmitter<void>();
  @Output()  onEdit =  new EventEmitter<void>();
  @Output()  onDelte =  new EventEmitter<any>();
  @HostBinding('@card') cardState ='out'; 

  @HostListener('mouseenter')
  onMouseEnter(){

    this.cardState='hover';

  }

  @HostListener('mouseleave')
  onMouseLeave(){

    this.cardState='out';

  }
  constructor(private router:Router) { }

  ngOnInit(): void {
    // console.log("input",this.item);
    
  }

  onInviteClick(){
    this.onInvite.emit();
  }

  onEditClick(){

  
    console.log("onEditClick");
    
    this.onEdit.emit(this.item);

  }
  onDeleteClick(){
    console.log(this.item)

    // this.ProjectService.del
    console.log("onDeleteClick");
    this.onDelte.emit(this.item);

  }

  //[routerLink]="['../','task',item.id]" 

  onClickImage(){
    this.router.navigateByUrl('task/'+this.item.id, {state:this.item})
    
    // (['../','task',this.item.id],{state:this.item})

  }
}
