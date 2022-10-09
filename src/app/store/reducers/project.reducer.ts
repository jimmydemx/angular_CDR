
import { Action, createReducer, State,on } from "@ngrx/store";
import { InitialState } from "@ngrx/store/src/models";
import { chain, difference } from "lodash";
import { Project, User } from "src/app/domain";
import * as PROJECT_ACTION from '../actions/project.action'

interface Entity {[id:string]:Project}



// 多个Project对应的是多个ids，ids是每个entity(Project.id)的集合
export interface ProjectState{
    ids: string[];
    entities: Entity;
    selectedId?:string | null;
}

export const initialState :ProjectState={
    ids: [],
    entities: {},

}

const ProjectReducer = createReducer(
    initialState,
    on(PROJECT_ACTION.PROJECT_ADD_SUCCESS, <O extends ProjectState,E extends Entity, k extends keyof Entity>(state:O,prop:Project)=> {
        debugger;
        if(prop.id){
            if(state.entities[prop.id]){
                return state;
            }
            const ids=[...state.ids, prop.id];
            const entities = {...state.entities, [prop.id]:prop}
            return {...state, ids: ids, entities: entities}
        }else {
            return state
        }
    }),
    on(PROJECT_ACTION.PROJECT_UPDATE_SUCCESS, <O extends ProjectState>(state:O,prop:any) => {

        if(prop.id){
            const newEntities ={...state.entities, [prop.id]:prop}
            return {...state, entities:newEntities}
        }else{
            return {...state}
        }
      
    }),
    on(PROJECT_ACTION.PROJECT_DELETE_SUCCESS, <O extends ProjectState, k extends keyof Entity>(state:O,prop:Project) => {
        const newIds = state.ids?.filter(id=>id!==prop.id)
  
        const newEntities= newIds.reduce((entities,id)=>({...entities, [id]:state.entities[id]}),{})
        return {
            ids:newIds,
            entities: newEntities,
            selectedId: null
        }

     }),
     on(PROJECT_ACTION.PROJECT_LOAD_SUCCESS, (state:ProjectState,prop:Project[]) => { 

        // 所有的Array[{1:a},{2:b}] 会变为{{1:a},{2:b}} 注意
        console.log("prop",prop,Object.values(prop));
        
        var prop_array = Object.values(prop)
        
        const incomingIds = prop_array.map(p=>p?.id)?.filter(p=>p);// can make sure the 
        const newIds = difference(incomingIds as string[],state?.ids)
        const inComingEntites = chain(prop).keyBy('id').mapValues(o=>o).value()  // array to object
        var newEntities = newIds?.reduce((entities,id)=>{
            if(id){
                return {...entities, [id]:inComingEntites[id]}
            }else{
                return {...entities}
            }
           
        },{})
        newEntities? newEntities:newEntities={}        
        return {
            ids: [...state.ids,...newIds],
            entities: {...state.entities,...newEntities},
            selectedId: null
        }
     }),
    on(PROJECT_ACTION.PROJECT_UPDATE_FAIL, (state,prop) => ({...state})),
    on(PROJECT_ACTION.PROJECT_ADD_FAIL, (state,prop) => ({ ...state})),
    on(PROJECT_ACTION.PROJECT_DELETE_SUCCESS, (state,prop) => ({ ...state})),
    on(PROJECT_ACTION.PROJECT_LOAD_FAIL, (state,prop) => ({ ...state})),
    on(PROJECT_ACTION.PROJECT_INVITE_SUCCESS, (state,prop) => ({ ...state})),
    on(PROJECT_ACTION.PROJECT_INVITE_FAIL, (state,prop) => ({ ...state})),
    // on(PROJECT_ACTION.PROJECT_INVITE_SUCCESS, (state:any,prop:Project) => ({ ...state, prop: updatedValue })),
    // on(PROJECT_ACTION.SELECT_PROJECT, (state,prop:Project) => ({ ...state, prop: updatedValue })),
    // on(PROJECT_ACTION.PROJECT_ADD_SUCCESS, (state,prop:Project) => ({ ...state, prop: updatedValue })),
    // on(PROJECT_ACTION.PROJECT_ADD_SUCCESS, (state,prop:Project) => ({ ...state, prop: updatedValue })),
    // on(PROJECT_ACTION.PROJECT_ADD_SUCCESS, (state,prop:Project) => ({ ...state, prop: updatedValue })),
);

export function reducer(state: ProjectState | undefined , action: Action) {

    return ProjectReducer(state, action);
}


