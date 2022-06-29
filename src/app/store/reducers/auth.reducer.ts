import { Action, createReducer, on } from "@ngrx/store";
import { Auth } from "src/app/domain";
import * as AuthActions from '../actions/auth.action'

export const initialState: Auth= {



}


const AuthReducer = createReducer(
    initialState,
    on(AuthActions.LOGIN_SUCCESS, (state,props) => (props)),
    on(AuthActions.LOGIN_FAIL, (state,props) => (initialState)),
    on(AuthActions.REGISTER_SUCCESS, (state,props) => (props)),
    on(AuthActions.REGISTER_FAIL, (state,props) => (initialState)),
    on(AuthActions.LOG_NAVIGATE,state=>state)

   
);

export function reducer(state: Auth | undefined, action: Action) {
    return AuthReducer(state, action);
}