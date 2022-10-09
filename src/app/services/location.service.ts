import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, map, Observable, of, take } from 'rxjs';
import { BASE_CONFIG, Base_config } from './quote.service';


interface Location{
        city: string;
        lat: string; 
        lng: string; 
        country: string; 
        iso2: string, 
        admin_name: string;
        capital: string;
        population: string;
        population_proper: string;
}

@Injectable({providedIn: 'root'})
export class LocationService {
    constructor(private http:HttpClient, @Inject(BASE_CONFIG) private BASE_URL: Base_config) {
        console.log(this.BASE_URL);
        
     }

    private domain!:string
    
    getCountry():Observable<string[]>{
        this.domain = "Spain"
        return of(["Spain"])

    }



    getProvince(country:string):Observable<string[]>{
        debugger;
        const url = `${this.BASE_URL.url}/${country}`
        if(!country || country==""){
            return of([])
        }else{
            return this.http.get<Location[]>(url).pipe(map(val=>{
              return Array.from(new Set(val.map(val=>val?.admin_name))) 
            }))  
        }
    }


    getCity(province:string):Observable<string[]>{
        const url = `${this.BASE_URL.url}/${this.domain}`

        if(!province){
            return of([])
        }else{
            return this.http.get<Location[]>(url, {params:{admin_name: province}}).pipe(map(val=>{
                return Array.from(new Set(val.map(val=>val?.city)))
            }))
        }
    }
}