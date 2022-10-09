import { A } from "@angular/cdk/keycodes";
import { Action, createReducer,on } from "@ngrx/store";
import { difference, differenceWith, intersectionBy, intersectionWith, isEqual } from "lodash";
import { taskList } from "src/app/domain";
import * as TaskListActions from "../actions/task-list.action";

type taskListObj= {
    [T in keyof taskListsState]:taskList
}


export interface taskListsState{
    projectId?: string;
    taskLists?: taskList[]
}


export const initialState: taskListsState={

}



const TaskListReducer = createReducer(
    initialState,

    on(TaskListActions.TASKLIST_LOAD_SUCCESS, (state,prop) => {
        // prop will be {a:{},b{}}, need to convert it to [{},{}], 
        var prop_array= Object.values(prop as taskListObj).filter(tasklist=>tasklist?.id)
        // clean all the previous tasklist and load everthing from the database
        return {
            projectId: state.projectId,
            ...prop_array&& {taskLists:prop_array},
        }
    }),
    
    on(TaskListActions.TASKLIST_SAVE_PROJECTID, (state,prop) => {
        debugger;
       if(prop?.id){
            return {
                projectId: prop.id,
                ...state.taskLists&&{taskLists:state.taskLists}
            }
       }else{
        throw {error:"Invalid Project ID stored"}
       }
    }),
    on(TaskListActions.TASKLIST_ADD_SUCCESS, (state,prop:taskList) => {
        // prop 判断拿到是否正确
        if(!state?.projectId){
            throw {error: "TaskLIst projectID is not stored"}
        }

        if(prop?.id && prop?.name && state?.taskLists && state?.projectId && state.projectId == prop.projectId){
            var newState = [...state.taskLists, prop]
            return {
                projectId:state.projectId,
                taskLists:newState
            }
        }
        if(!state?.taskLists && state.projectId == prop.projectId){
            return {
                projectId:state.projectId,
                ...{taskLists: [prop]}
            }
        }
        if(!prop?.id || !prop?.name || state.projectId !== prop.projectId){
            throw {error:"datbase of Tasklist no consistant"}
        }
        return {...state};

    }),
    on(TaskListActions.TASKLIST_DELETE_SUCCESS, (state,prop)=>{
        debugger;
    
        var newList = state?.taskLists?.filter(val=>val?.id !==prop.id)
        
        return {
            projectId: state.projectId,
            ...newList&&{taskLists:newList}
        }
    }),
    on(TaskListActions.TASKLIST_UPDATE_SUCCESS,(state,prop)=>{
        var newList = state?.taskLists?.filter(val=>val?.id !==prop.id)
        if(newList){
            return{
                projectId: state.projectId,
                taskLists:[...newList,prop]
            }
        }else{
            return {
                projectId: state.projectId,
                taskLists:[prop] 
            }
        }
    })
    
);



export function reducer(state: taskListsState| undefined, action: Action) {
    return TaskListReducer(state, action);
}