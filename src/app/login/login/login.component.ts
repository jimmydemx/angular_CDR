import { Component, OnInit, QueryList } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Quote } from 'src/app/domain/quote.model';
import { QuoteSevice } from 'src/app/services/quote.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  quotes!:Quote[];
  quote!:Quote;
  form!: FormGroup;
  constructor(private quoteService$:QuoteSevice, private fb: FormBuilder) { 
    
    this.quoteService$.getQuote().subscribe(q=>{
      this.quotes = q.quotes
      this.quote = this.quotes[Math.floor(Math.random()*10)]
      console.log(this.quote)

    } )
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
      console.log(JSON.stringify(form.value));
      console.log(form.valid);
     // this.form.controls['email'].setValidators(this.validate);
  }

  validate(c:FormControl):{[key:string]:any}{
    if(!c.value){
      return {null:null};
    }
    const pattern =/^j.*$/;
      if(pattern.test(c.value)){
        console.log(c.value);
        return {emailIsValid:true};
      }else return {
        emailNotValid : 'the email must start with j_'
      }
  }
}
