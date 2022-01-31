import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Quote } from '../domain/quote.model';


interface response{
    "quotes": Quote[]
}

@Injectable({
  providedIn: 'root'
})
export class QuoteSevice {


    url = "https://www.fastmock.site/mock/b3b277108b173188360b98db1189b812/trello/quotes";

     constructor(private http: HttpClient){

     }

     getQuote():Observable<response>{
         return this.http.get(this.url).debug('quote: ')
         .pipe(
            map(response=>response as response))
     }
 
}
