import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DragDropService } from '../drag-drop.service';


@Directive({
  selector: '[appDrag][dragTag][dragData][draggedClass]'
})
export class DragDirective {
  private _isDraggble = false;

  // 在dom中使用 app-draggable= 'true' 就只直接调用了 set isDraggable(val)方法，this._isDraggble = true
  @Input('appDrag')
  set isDraggable(val: boolean){
    this._isDraggble = val;
    this.rd2.setAttribute(this.el.nativeElement,'draggable',`${val}`)
  }

  get isDraggable(){
    return this._isDraggble;
  }


  @Input() draggedClass:string='';
  @Input() dragTag: string='';
  @Input() dragData:any;
  constructor(private rd2:Renderer2, private el:ElementRef, private service: DragDropService) { }

  @HostListener('dragstart', ["$event"])
  onDragStart(ev:Event){
    if (this.el.nativeElement=== ev.target){
      this.rd2.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData})

    }
  }

  @HostListener('dragend',['$event'])
  onDragEnd(ev:Event){
    if (this.el.nativeElement=== ev.target){
      this.rd2.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }


}
