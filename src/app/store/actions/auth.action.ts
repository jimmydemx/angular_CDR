import { createAction, props } from "@ngrx/store";
import { Auth, User } from "src/app/domain";




export const LOGIN = createAction('[Auth] LOGIN', props<{email:string,password:string}>());
export const LOGIN_SUCCESS = createAction('[Auth] LOGIN_SUCCESS',props<Auth>());
export const LOGIN_FAIL = createAction('[Auth] LOGIN_FAIL',props<String>());
export const REGISTER = createAction('[Auth] REGISTER', props<User>());
export const REGISTER_SUCCESS = createAction('[Auth] REGISTER_SUCCESS', props<Auth>());
export const REGISTER_FAIL = createAction('[Auth] REGISTER_FAIL', props<String>());
export const LOGOUT = createAction('[Auth] LOGOUT');
export const LOG_NAVIGATE = createAction('[Auth] LOG_NAVIGATE');
