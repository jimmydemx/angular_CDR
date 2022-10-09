import { createAction,props } from "@ngrx/store";
import { Project, taskList } from "src/app/domain";


export const TASKLIST_ADD = createAction('[TASKLIST] TASKLIST_ADD', props<taskList>());
export const TASKLIST_ADD_SUCCESS = createAction('[TASKLIST] TASKLIST_ADD_SUCCESS', props<taskList>());
export const TASKLIST_ADD_FAIL = createAction('[TASKLIST] TASKLIST_ADD_FAIL', props<{error: string}>());
export const TASKLIST_UPDATE = createAction('[TASKLIST] TASKLIST_UPDATE', props<taskList>());
export const TASKLIST_UPDATE_SUCCESS = createAction('[TASKLIST] TASKLIST_UPDATE_SUCCESS', props<taskList>() );
export const TASKLIST_UPDATE_FAIL = createAction('[TASKLIST] TASKLIST_UPDATE_FAIL', props<{error: string}>());
export const TASKLIST_LOAD = createAction('[TASKLIST] TASKLIST_LOAD ',props<Project>());
export const TASKLIST_LOAD_SUCCESS = createAction('[TASKLIST] TASKLIST_LOAD_SUCCESS', props<any>()); // Project[] can't be array?
export const TASKLIST_LOAD_FAIL = createAction('[TASKLIST] TASKLIST_LOAD_FAIL', props<any>());
export const TASKLIST_SWAP = createAction('[TASKLIST] TASKLIST_SWAP', props<{src:taskList,target: taskList }>());
export const TASKLIST_SWAP_SUCCESS = createAction('[TASKLIST] TASKLIST_SWAP_SUCCESS', props<taskList>());
export const TASKLIST_SWAP_FAIL = createAction('[TASKLIST] TASKLIST_SWAP_FAIL', props<{error: string}>());
export const TASKLIST_DELETE = createAction('[TASKLIST] TASKLIST_DELETE', props<taskList>());
export const TASKLIST_DELETE_SUCCESS = createAction('[TASKLIST] TASKLIST_DELETE_SUCCESS', props<taskList>());
export const TASKLIST_DELETE_FAIL = createAction('[TASKLIST] TASKLIST_DELETE_FAIL', props<{error: string}>());
export const TASKLIST_SAVE_PROJECTID = createAction('[TASKLIST] TASKLIST_SAVE_PROJECTID', props<Project>());