import { async } from '@angular/core/testing';
import {reducer,initialState} from './auth.reducer';
import * as AuthActions from '../actions/auth.action'

describe("Check AuthReducer", ()=>{
    describe('Undefined Action',()=>{
        it ("return a default state", async(()=>{
            const action ={} as any;
            const result = reducer(undefined, action);
            expect(result).toEqual(initialState)
        }))
    })

    describe("login successfully",()=>{
        it("it shall return sth"), async(()=>{
            // change action to state (both Auth);
            const action ={
                type: '[Auth] LOGIN_SUCCESS',
                token:'',
                user: {
                    email: "wpcfan@163.com",
                    id: "37489e0c-df34-c261-71c4-ce75357e3035",
                }
            }
            const result  = reducer(undefined, action);

                expect(result.user).toEqual(action.user  as any)
        
 
            expect(result.err).toBeUndefined();
        })
      
    })

})
