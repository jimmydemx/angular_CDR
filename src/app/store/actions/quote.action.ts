import { createAction, props } from "@ngrx/store";
import { Quote } from "src/app/domain/quote.model";

// export const QUOTE = 'Quote';
// export const QUOTE_SUCCESS = 'Quote Success';
// export const QUOTE_FAIL = 'Quote Fail'

export const QUOTE_LOAD = createAction('[QUOTE] Quote');

export const QUOTE_SUCCESS = createAction('[QUOTE] Quote Success',  props<Quote>());

export const QUOTE_FAIL = createAction('[QUOTE] Quote Fail',props<String>());