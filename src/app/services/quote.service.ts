import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Quote } from '../domain/quote.model';


interface response{
    "quotes": Quote[]
}


export interface Base_config {
  url: string;
}

export const BASE_CONFIG =new InjectionToken<Base_config>('app.config', {
  providedIn: 'root', //设置token位置
  factory:()=>({
      url:"http://localhost:3000"
  })
})


@Injectable({
  providedIn: 'root'
})
export class QuoteSevice {


    url = "https://www.fastmock.site/mock/b3b277108b173188360b98db1189b812/trello/quotes";

     constructor(private http: HttpClient){

     }

     getQuote():Observable<response>{
         return this.http.get(this.url)
         .pipe(
            map(response=>response as response))
     }
 
}
