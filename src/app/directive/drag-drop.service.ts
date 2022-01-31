import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface DragData {
  tag: string ,
  data: any,
} 

@Injectable({
  providedIn: 'root'
})
export class DragDropService {


  private _dragData = new BehaviorSubject<DragData>({tag:'',data:null});


  setDragData(data:DragData){
    this._dragData.next(data);
  }

  getDragDate():Observable<DragData>{
      return this._dragData.asObservable()
  }

  clearDragData(){
    this._dragData.next({tag:'',data:null});
  }

  constructor() { }
}
