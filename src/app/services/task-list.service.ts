import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { concat, count, from, map, mergeMap, Observable, reduce, switchMap } from 'rxjs';
import { Project, taskList } from '../domain';
import { BASE_CONFIG, Base_config } from './quote.service';


@Injectable({providedIn: 'root'})
export class TaskListService {

    private readonly domain = 'tasklists'
    private headers = {
        'Content-Type': "application/json"
    }
    constructor(private http: HttpClient,@Inject(BASE_CONFIG) private config:Base_config) { 
        console.log("base_config",this.config);
        
    }

    add(tasklists: taskList):Observable<taskList>{
        debugger;
        // tasklists has been frozen Object.freeze(obj)
        var tl= {...tasklists}
        tl.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http.post<taskList>(url, JSON.stringify(tl), {headers:this.headers }).pipe(map(res=> res))
    }


    update(tasklists: taskList):Observable<taskList>{

        if(tasklists?.id){
            const url = `${this.config.url}/${this.domain}/${tasklists.id}`;
            const toUpdate ={
                name:tasklists.name,
                order:tasklists.order,
                projectId: tasklists.projectId
    
            }
            return this.http.patch<taskList>(url, JSON.stringify(toUpdate), {headers:this.headers }).pipe(map(res=> {

                if(res.name && res.order && res.projectId){
                    return res
                }else{

                    throw  "incoming-update : res is invalid: " +res
                }
            }))

        }else{
            throw {error:`outgoing-update: tasklist has invalid id :${tasklists?.id}`}
        }      
    }

    del(tasklists:taskList):Observable<taskList> {
     

        if(tasklists.id&&tasklists.taskIds){
            const delTasks$ = from(tasklists.taskIds).pipe(mergeMap(listid=>this.http.delete(`${this.config.url}/taskLists/${listid}`)),count())

            return delTasks$.pipe(switchMap(_=> this.http.delete(`${this.config.url}/${this.domain}/${tasklists.id}`)),map(_=>tasklists))
        }else{
            throw {error: "invalid tasklists id/taskids"}
        }
       

    }

    get(projectId:string) :Observable<taskList[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http.get<taskList[]>(url, {params:{'projectId':projectId}})

    }


    swapOrder(src: taskList, target:taskList):Observable<taskList>{
            const drageUrl = `${this.config.url}/${this.domain}/${src.id}`
            const dropUrl = `${this.config.url}/${this.domain}/${target.id}`
            const drag$ = this.http.patch<taskList>(drageUrl, JSON.stringify({order:target.order}),{headers:this.headers}).pipe(map(res=>res))
            const drop$ = this.http.patch<taskList>(dropUrl, JSON.stringify({order:src.order}),{headers:this.headers}).pipe(map(res=>res))
            return concat(drag$,drop$).pipe((map(a=>a)))

    }



    
    
}