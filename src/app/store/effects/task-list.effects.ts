import { Injectable } from "@angular/core";
import { Actions, createEffect,ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { TaskListService } from "src/app/services/task-list.service";
import * as TaskListActions from "../actions/task-list.action";

@Injectable()
export class TaskListEffects{
     constructor(private actions$:Actions, private service:TaskListService ){


     }



    LOAD_TASKLIST$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(TaskListActions.TASKLIST_LOAD),
                map(project=> TaskListActions.TASKLIST_SAVE_PROJECTID(project)),
                catchError(error=>of(TaskListActions.TASKLIST_LOAD_FAIL(error)))    
        )   
    })

    
    LOAD_TASKLIST_WITH_PROJECTID$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskListActions.TASKLIST_SAVE_PROJECTID),
            switchMap(project=>{
                debugger;
                if(project.id && project.id!==null){
                    
                    return this.service.get(project.id)
                    
                }else{
                    throw  {error:"invalid project ID"}
                    return of([])
                }
             }),tap(console.log),
             map(tasklists=> TaskListActions.TASKLIST_LOAD_SUCCESS(tasklists)),
             catchError(error=>of(TaskListActions.TASKLIST_LOAD_FAIL(error)))
        )
    })

    ADD_TASKLIST$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskListActions.TASKLIST_ADD),
            switchMap(tasklist=>{
               return this.service.add(tasklist)
            }),
            map(tasklist=>TaskListActions.TASKLIST_ADD_SUCCESS(tasklist)),
            catchError(error=>{
                console.log(error);
                
                return of(TaskListActions.TASKLIST_ADD_FAIL(error))
            
            })
        )})
     
    DELETE_TASKLIST$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskListActions.TASKLIST_DELETE),
            switchMap(tasklist=> this.service.del(tasklist)),
            map(tasklist=>TaskListActions.TASKLIST_DELETE_SUCCESS(tasklist)),
            catchError(error=>of(TaskListActions.TASKLIST_DELETE_FAIL(error)))

        )})      
        
    UPDATE_TASKLIST$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskListActions.TASKLIST_UPDATE),
            switchMap(tasklist=> this.service.update(tasklist)),
            map(tasklist=>TaskListActions.TASKLIST_UPDATE_SUCCESS(tasklist)),
            catchError(error=>of(TaskListActions.TASKLIST_UPDATE_FAIL(error)))
            )})               

    SWAP_TASKLIST$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskListActions.TASKLIST_SWAP),
            switchMap(({src, target})=> this.service.swapOrder(src,target)),
            map(tasklist=>TaskListActions.TASKLIST_SWAP_SUCCESS(tasklist)),
            catchError(error=>of(TaskListActions.TASKLIST_SWAP_FAIL(error)))
            )})     
}