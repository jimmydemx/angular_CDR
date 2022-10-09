import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, ActionReducerMap, combineReducers, createFeatureSelector, createReducer, createSelector, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as quoteReducer from './reducers/quote.reducer';
import * as AuthReducer from './reducers/auth.reducer'
import * as ProjectsReducer from './reducers/project.reducer';
import * as TaskListsReducer from './reducers/task-list.reducer';
import {storeFreeze}   from 'ngrx-store-freeze'
import { QuoteEffects } from './effects/quote.effects';
import { Auth, User } from '../domain';
import { AuthEffects } from './effects/auth.effects';
import { ProjectState } from './reducers/project.reducer';
import { ProjectEffect } from './effects/project.effects';
import { TaskListEffects } from './effects/task-list.effects';


export interface RootState{
  quote : quoteReducer.State,
  auth: Auth,
  projects: ProjectState
  tasklists: TaskListsReducer.taskListsState

}


const RootinitialState={
  quote :quoteReducer.initialState,
  auth: AuthReducer.initialState,
  projects: ProjectsReducer.initialState,
  tasklists: TaskListsReducer.initialState
}



const reducers: ActionReducerMap<RootState> ={
   quote: quoteReducer.reducer,
   auth:AuthReducer.reducer,
   projects: ProjectsReducer.reducer,
   tasklists: TaskListsReducer.reducer
}

const productionRootReducers : ActionReducer<RootState>= combineReducers(reducers)

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [storeFreeze]: [];
// const developmentRootReducers: ActionReducer<RootState> = combineReducers(storeFreeze(reducers))
// const RootReducer = createReducer(
//   RootinitialState,
//   on(rooteReducers, state => ({ ...state, prop: updatedValue })),
// );

export function reducer(state: RootState = RootinitialState, action:any) {
  return combineReducers(reducers)(state,action)
}


//selector
export const getQuoteState = createFeatureSelector<quoteReducer.State>('quote')
export const getQuoteContentState = createSelector(getQuoteState,(state:quoteReducer.State)=>state.quote)

export const getAuthState = createFeatureSelector<Auth>('auth')
export const getProjectsState = createFeatureSelector<ProjectState>('projects')
export const GetProjectsIds = createSelector(getProjectsState, state=>state?.ids)
export const GetProjectsEntities = createSelector(getProjectsState, state=>state?.entities)
export const GetProjectsSelectedIds = createSelector(getProjectsState, state=>state?.selectedId)
export const GetAllProjects = createSelector(GetProjectsIds,GetProjectsEntities,(ids,entities)=>{
  return ids?.map(id=>entities[id])
})

export const  getTaskState = createFeatureSelector<TaskListsReducer.taskListsState>("tasklists")
export const getTaskLists = createSelector(getTaskState, list=>list?.taskLists)
export const getTaskListsOrder = createSelector(getTaskLists, lists=>{
  return lists?.map(list=>list?.order)?.sort()
})
@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([QuoteEffects,AuthEffects,ProjectEffect,TaskListEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {}