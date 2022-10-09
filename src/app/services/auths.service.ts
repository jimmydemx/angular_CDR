import { R } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Auth, User } from '../domain';
import { BASE_CONFIG, Base_config } from './quote.service';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly domain = 'users';
    private headers={
        'Content-Type': 'application/json'
    };

    private token =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

    constructor(private http:HttpClient, @Inject(BASE_CONFIG) private config: Base_config) { }

    register(user: User):Observable<Auth>{
        debugger;
        const url = `${this.config.url}/${this.domain}`;
        return this.http.get(url,{params:{"email":user.email}}).pipe(switchMap(res=>{
            if(res && ((res as string)?.length>0 || Object.keys(res)?.length>0)){
                debugger;
                console.log("here is error");
                throw "user existed"
            }
            return this.http.post<User>(url, JSON.stringify(user),{headers:this.headers}).pipe(map(r =>({token: this.token, ...r&&{user:r},...r?.id&&{userId:r?.id}})))
        }))
    }


    login(username: string, password: string): Observable<Auth>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http.get<User[]>(url,{params:{'email':username,'password':password}}).pipe(
            map(res=>{
                if(!res || Object.keys(res)?.length==0){
                    throw('username or password not match')
                }else if(Object.keys(res)?.length>1){
                    throw('wrong data from backend, there are more user shared one id')
                }else if(!res[0]?.id){
                    // check if id exist                    
                    throw ("wrong data from backend, no id found")
                }

                return ({
                    token :this.token,
                    user: res[0],
                    userId:res[0]?.id
                } as Auth)
            })
        )
    }

}