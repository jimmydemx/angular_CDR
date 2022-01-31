import { Directive, ElementRef, HostListener, Renderer2,Input, Output, EventEmitter } from '@angular/core';
import { DragData, DragDropService } from '../drag-drop.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appDrop][dropTags][dragEnterClass]'
})
export class DropDirective {

  @Output() dropped =new EventEmitter<DragData>();
  @Input() dragEnterClass : string='';
  @Input() dropTags :string[]=[];
  private data$;

  constructor(private el: ElementRef, private rd2: Renderer2, private service: DragDropService) { 
      this.data$ = this.service.getDragDate().pipe(take(1));
  }

  @HostListener('dragenter',['$event'])
  onDragEnter(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
        this.data$.subscribe(dragData=>{
          if (this.dropTags.indexOf(dragData.tag)> -1){
              this.rd2.addClass(this.el.nativeElement, this.dragEnterClass);
          }
        })
    }
  } 

  @HostListener('dragover',['$event'])
  onDragOver(ev: Event){
     ev.preventDefault();
     ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
        this.data$.subscribe(dragData=>{
          if (this.dropTags.indexOf(dragData.tag)> -1){
               this.rd2.setProperty(ev, 'dataTransfer.effectAllowed','all');
               this.rd2.setProperty(ev, 'dataTransfer.dropEffect','move');
          }else{
               this.rd2.setProperty(ev,'dataTransfer.effectAllowed','none');
               this.rd2.setProperty(ev,'dataTransfer.dropEffect','none');
          }
        })
        
    }
  }

  @HostListener('dragleave',['$event'])
  onDragLeave(ev: Event){
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(dragData=>{
        if (this.dropTags.indexOf(dragData.tag)> -1){
            this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      })
    }
  }

  @HostListener('drop',['$event'])
  onDrop(ev: Event){
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(dragData=>{
        if (this.dropTags.indexOf(dragData.tag)> -1){
            this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
            this.dropped.emit();
            this.service.clearDragData();
        }
      })
    }
  }

}


