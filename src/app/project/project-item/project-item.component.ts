import { Component, EventEmitter, Input, OnInit, Output,HostBinding, HostListener} from '@angular/core';
import { cardAnim } from 'src/app/animation/card.anim';


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
  constructor() { }

  ngOnInit(): void {
  }

  onInviteClick(){
    this.onInvite.emit();
  }

  onEditClick(){
    console.log("onEditClick");
    
    this.onEdit.emit();

  }
  onDeleteClick(){
    console.log("onDeleteClick");
    this.onDelte.emit(null);

  }
}
