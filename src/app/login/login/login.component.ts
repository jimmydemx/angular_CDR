import { Component, OnInit, QueryList } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { Quote } from 'src/app/domain/quote.model';
import { QuoteSevice } from 'src/app/services/quote.service';
import { getQuoteContentState } from 'src/app/store';
import { QUOTE_LOAD, QUOTE_SUCCESS } from 'src/app/store/actions/quote.action';
import {LOGIN} from 'src/app/store/actions/auth.action';

import * as fromRoot from '../../store/reducers/quote.reducer'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  quotes!:Quote[];
  quote!:Quote;
  quote$!: Observable<{quote:Quote}>
  form!: FormGroup;
  constructor(private quoteService$:QuoteSevice, private fb: FormBuilder, private store$: Store<fromRoot.State>) { 

    console.log(this.store$);
    this.quote$= this.store$.pipe(select("quote")) as unknown as Observable<{quote:Quote}>
    this.quote$.subscribe(console.log)
    this.store$.dispatch(QUOTE_LOAD())
    
    // this.quoteService$.getQuote().subscribe(q=>{
    //   this.quotes = q.quotes;
    //   this.quote = this.quotes[Math.floor(Math.random()*10)]
    //   this.store$.dispatch(QUOTE_SUCCESS(this.quote))
    //    this.store$.select(getQuoteContentState).subscribe(val=>console.log("getQuoteContentState",val))
    //   this.quote$.subscribe(val=>console.log(val))
    //   console.log(this.quote)

    // } )
  }

  ngOnInit(): void {
    
    this.form = this.fb.group({
        email: ['j_demx@yahoo.com', Validators.compose([Validators.required,Validators.email,this.validate])],
        password: ['', Validators.required]

    })
    // console.log(this.quote)
  }

  onSubmit(form:any, event:any){
    event.preventDefault();
      console.log(form,event);
      // console.log(form.valid);
     // this.form.controls['email'].setValidators(this.validate);
     this.store$.dispatch(LOGIN(form?.value))
  }

  validate(c:any):{[key:string]:any} | null{
    if(!c.value){
      return {null:null};
    }
    const pattern =/^j.*$/;
      if(pattern.test(c.value)){
        console.log(c.value);
        return null;
      }else return {
        emailNotValid : 'the email must start with j_'
      }
  }
}
