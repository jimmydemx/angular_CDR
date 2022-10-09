
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions,createEffect,ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";


import { map, of, switchMap, withLatestFrom,catchError, throwError, tap } from "rxjs";
import {  Project } from "src/app/domain";
import { ProjectService } from "src/app/services/project.service";
import { getAuthState, RootState } from "..";
import * as PROJECT_ACTION from '../actions/project.action'

@Injectable()
export class ProjectEffect{

    constructor(private actions$:Actions,private store$:Store<RootState>, private services$:ProjectService,private router:Router){

    }

    // 使用withLatestFrom this.store$.select(getAuthState)是一个流，然后呢？这个值会经常变化，要取最后一个变化的值吧
    LOAD_PROJECTS$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(PROJECT_ACTION.PROJECT_LOAD),
                withLatestFrom(this.store$.select(getAuthState)),
                switchMap(([_, auth])=>{
                    debugger;
                    
                    if(auth && Object.keys(auth).length>0 && auth.userId){
                       return  this.services$.get(auth.userId)
                    }else{
                       throw {error:"not authorized"}
                        return of([])
                    }
                }),tap(console.log)
                ,map(projects => PROJECT_ACTION.PROJECT_LOAD_SUCCESS(projects)),
                catchError(error=> of(PROJECT_ACTION.PROJECT_LOAD_FAIL(error)))            
        );
    });

    // get user and add the project to the user, 只是
    ADD_PROJECT$= createEffect(()=>{
        return this.actions$.pipe(
            ofType(PROJECT_ACTION.PROJECT_ADD),
            withLatestFrom(this.store$.select(getAuthState)),
            switchMap(([project, auth])=>{
                if(auth && Object.keys(auth).length>0 && auth.userId){
                    const added = {...project, members:[`${auth?.userId}`]}
                    return this.services$.add(added)
                }else{
                    throw {error:"not authorized"}
                    return of([])
                }
            }),
            map(projects => PROJECT_ACTION.PROJECT_ADD_SUCCESS(projects as Project)),
            catchError(error=>of(PROJECT_ACTION.PROJECT_ADD_FAIL(error)))
        )
    })

    UPDATE_PROJECT$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(PROJECT_ACTION.PROJECT_UPDATE),
            withLatestFrom(this.store$.select(getAuthState)),
            switchMap(([project,auth])=>{
                if(auth && Object.keys(auth).length>0 && auth.userId){
                    return this.services$.update(project)
                }else {
                    throw {error:"not authorized"}
                    return of([])
                }
            }),
            map(projects=> PROJECT_ACTION.PROJECT_UPDATE_SUCCESS(projects as Project)),
            catchError(error=>of(PROJECT_ACTION.PROJECT_UPDATE_FAIL(error)))
        )
    })


    DELETE_PROJECT$=createEffect(()=>{
        return this.actions$.pipe(
            ofType(PROJECT_ACTION.PROJECT_DELETE),
            withLatestFrom(this.store$.select(getAuthState)),
            switchMap(([project,auth])=>{
                if(auth && Object.keys(auth).length>0 && auth.userId){
                return this.services$.del(project)
                }else{
                    throw {error:"not authorized"}
                    return of([])
                }
            }),
            map(projects=> PROJECT_ACTION.PROJECT_DELETE_SUCCESS(projects as Project)),
            catchError(error=>of(PROJECT_ACTION.PROJECT_DELETE_FAIL(error)))
        )
    })

    SELECT_PROJECT$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(PROJECT_ACTION.SELECT_PROJECT),
            map(project=> {
                if(project && project.id && project.id !== null){
                    this.router.navigate(['/tasklists/'+project?.id])
                }
                return PROJECT_ACTION.PROJECT_ADD_FAIL("selecte_project")
            })
        )})
    
    INVITE_MEMBERS$= createEffect(()=>{
        return this.actions$.pipe(
            ofType(PROJECT_ACTION.PROJECT_INVITE),
            withLatestFrom(this.store$.select(getAuthState)),
            switchMap(([{projectID,members},auth])=>{
                if(auth && Object.keys(auth).length>0 && auth.userId){
                return this.services$.invite(projectID,members)
                }else{
                    throw {error:"not authorized"}
                    return of([])
                }
            }),
            map(project => PROJECT_ACTION.PROJECT_INVITE_SUCCESS(project as Project)),
            catchError(err=>of(PROJECT_ACTION.PROJECT_INVITE_FAIL(err)))
        )
    })

}

