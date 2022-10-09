import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { defaultIfEmpty, map, Observable, of } from 'rxjs';
import { getAuthState, RootState } from '../store';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private store$: Store<RootState>, private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {

        return  this.store$.select(getAuthState).pipe(map(auth => {
           const result = auth.token !== null &&auth.token !== undefined 
           if(result){
                this.router.navigate(["/login"])
           }
           return result;
        
        }),defaultIfEmpty(false))
    }
}