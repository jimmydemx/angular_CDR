import { createAction,props } from "@ngrx/store";
import { Project, User } from "src/app/domain";

export const PROJECT_ADD = createAction('[PROJECT] PROJECT_ADD', props<Project>());
export const PROJECT_ADD_SUCCESS = createAction('[PROJECT] PROJECT_ADD_SUCCESS', props<Project>());
export const PROJECT_ADD_FAIL = createAction('[PROJECT] PROJECT_ADD_FAIL', props<String>());
export const PROJECT_UPDATE = createAction('[PROJECT] PROJECT_UPDATE', props<Project>());
export const PROJECT_UPDATE_SUCCESS = createAction('[PROJECT] PROJECT_UPDATE_SUCCESS', props<Project>() );
export const PROJECT_UPDATE_FAIL = createAction('[PROJECT] PROJECT_UPDATE_FAIL', props<String>());
export const PROJECT_LOAD = createAction('[PROJECT] PROJECT_LOAD ');
export const PROJECT_LOAD_SUCCESS = createAction('[PROJECT] PROJECT_LOAD_SUCCESS', props<any>()); // Project[] can't be array?
export const PROJECT_LOAD_FAIL = createAction('[PROJECT] PROJECT_LOAD_FAIL', props<any>());
export const PROJECT_INVITE = createAction('[PROJECT] PROJECT_INVITE', props<{projectID:string,members: User[] }>());
export const PROJECT_INVITE_SUCCESS = createAction('[PROJECT] PROJECT_INVITE_SUCCESS', props<Project>());
export const PROJECT_INVITE_FAIL = createAction('[PROJECT] PROJECT_INVITE_FAIL', props<String>());
export const PROJECT_DELETE = createAction('[PROJECT] PROJECT_DELETE', props<Project>());
export const PROJECT_DELETE_SUCCESS = createAction('[PROJECT] PROJECT_DELETE_SUCCESS', props<Project>());
export const PROJECT_DELETE_FAIL = createAction('[PROJECT] PROJECT_DELETE_FAIL', props<String>());

export const SELECT_PROJECT = createAction('[PROJECT] SELECT_PROJECT', props<Project>());