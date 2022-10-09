import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap,of, tap } from "rxjs";
import { User } from "src/app/domain";
import { AuthService } from "src/app/services/auths.service";
import * as AuthActions from '../actions/auth.action'


@Injectable()
export class AuthEffects{
    constructor(
        private actions$: Actions,
        private AuthSevice: AuthService,
        private route: Router
    ){}

LOGIN$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(AuthActions.LOGIN), 
            switchMap(({email,password})=>this.AuthSevice.login(email,password)),tap(console.log),
            map(auth=> AuthActions.LOGIN_SUCCESS(auth)),
            catchError(err=>of(AuthActions.LOGIN_FAIL(JSON.stringify(err))))
)});

REGISTER$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(AuthActions.REGISTER),  
            switchMap((user:User)=>this.AuthSevice.register(user)),
            map(auth=> AuthActions.REGISTER_SUCCESS(auth)),
            catchError(err=>{
                console.log(err);
                return of(AuthActions.REGISTER_FAIL(JSON.stringify(err)))})  // 注意加of

)});


LOGOUT$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(AuthActions.LOGOUT),      
            map(_=>{
                this.route.navigate(['/'])   
                return AuthActions.LOG_NAVIGATE()
            })    
)});


LOGIN_NAVIGATE$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        map(_=>{
            this.route.navigate(['/projects'])   
            return AuthActions.LOG_NAVIGATE()
        })
    )
})


LOGIN_REGISTER$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(AuthActions.REGISTER_SUCCESS),
        map(_=>{
            this.route.navigate(['/projects'])   
            return AuthActions.LOG_NAVIGATE()
        })
    )
})






}   