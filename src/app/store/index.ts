import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, ActionReducerMap, combineReducers, createFeatureSelector, createReducer, createSelector, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as quoteReducer from './reducers/quote.reducer';
import * as AuthReducer from './reducers/auth.reducer'
import {storeFreeze}   from 'ngrx-store-freeze'
import { QuoteEffects } from './effects/quote.effects';
import { Auth } from '../domain';
import { AuthEffects } from './effects/auth.effects';


export interface RootState{
  quote : quoteReducer.State,
  auth: Auth

}


const RootinitialState={
  quote :quoteReducer.initialState,
  auth: AuthReducer.initialState
}



const reducers: ActionReducerMap<RootState> ={
   quote: quoteReducer.reducer,
   auth:AuthReducer.reducer
}

const productionRootReducers : ActionReducer<RootState>= combineReducers(reducers)

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [storeFreeze]: [];
// const developmentRootReducers: ActionReducer<RootState> = combineReducers(storeFreeze(reducers))
// const RootReducer = createReducer(
//   RootinitialState,
//   on(rooteReducers, state => ({ ...state, prop: updatedValue })),
// );

export function reducer(state: RootState | undefined = RootinitialState, action:any) {
  return combineReducers(reducers)(state,action)
}


//selector
export const getQuoteState = createFeatureSelector<quoteReducer.State>('quote')
export const getQuoteContentState = createSelector(getQuoteState,(state:quoteReducer.State)=>state.quote)

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([QuoteEffects,AuthEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {}