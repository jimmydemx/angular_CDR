
import { Action, createReducer, on } from "@ngrx/store";
import {Quote} from '../../../app/domain/quote.model';
import * as QuoteRe from "../actions/quote.action";

export interface State{
quote: Quote
}

export const initialState:State={
    quote: {
        "cn": "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
        "en": "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
        "pic": "/assets/img/quotes/0.jpg"
    }
}


// const quoteReducer = createReducer(
//     initialState,
//     on(QuoteRe.QUOTE_SUCCESS, (state,{quote:quote})=>{
       
//         console.log("13131",state,quote);
        
//         return {...state,quote}

//     })
    
    
    
// );



export const reducer = createReducer(
    initialState,
    on(QuoteRe.QUOTE_SUCCESS, (state,quote
        ) =>({quote})),
     on(QuoteRe.QUOTE_FAIL,(state,err)=> {
         console.log("err",err)
        return state})   

  )


