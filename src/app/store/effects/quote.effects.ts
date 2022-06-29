import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Quote } from "src/app/domain";
import { QuoteSevice } from "src/app/services/quote.service";
import * as QuoteRe from "../actions/quote.action";


@Injectable()
export class QuoteEffects{
    constructor(
        private actions$: Actions,
        private QuoteSevice: QuoteSevice
    ){}


    getQuote$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(QuoteRe.QUOTE_LOAD),
                switchMap(_=>this.QuoteSevice.getQuote()),
                map(q=> {
                    const quote = q?.quotes[Math.floor(Math.random()*10)]
                    return QuoteRe.QUOTE_SUCCESS(quote)
                }),
                catchError(err=>of(QuoteRe.QUOTE_FAIL(JSON.stringify(err)))
    ))}); 

}   
