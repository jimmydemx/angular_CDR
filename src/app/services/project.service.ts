import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { union } from 'lodash';
import { count, from, map, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { Project, User } from '../domain';
import { BASE_CONFIG, Base_config } from './quote.service';


@Injectable({providedIn: 'root'})
export class ProjectService {

    private readonly domain = 'projects'
    private headers = {
        'Content-Type': "application/json"
    }
    constructor(private http: HttpClient,@Inject(BASE_CONFIG) private config:Base_config) { 
        console.log("base_config",this.config);
        
    }

    add(project: Project):Observable<Project>{
        project.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http.post<Project>(url, JSON.stringify(project), {headers:this.headers }).pipe(map(res=> res))
    }


    update(project: Project):Observable<Project>{
        const url = `${this.config.url}/${this.domain}/${project.id}`;

        const toUpdate ={
            name:project.name,
            desc:project.desc,
            coverImg: project.coverImg,
            ...project.members&&{members:project.members}

        }
        return this.http.patch<Project>(url, JSON.stringify(toUpdate), {headers:this.headers }).pipe(map(res=> res))
    }

    del(project:Project):Observable<Project>{
        if(project.taskLists){
            const delTasks$ = from(project.taskLists).pipe(mergeMap(listid=>this.http.delete(`${this.config.url}/taskLists/${listid}`)),count())
            return delTasks$.pipe(switchMap(_=> this.http.delete(`${this.config.url}/${this.domain}/${project.id}`)),map(_=>project))
        }else{
           return this.http.delete(`${this.config.url}/${this.domain}/${project.id}`).pipe(map(_=>project))
        }
      

    }

    get(useId:string) :Observable<Project[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http.get<Project[]>(url, {params:{'members_like':useId}})

    }



    getAll():Observable<Project[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http.get<Project[]>(url)

    }

    // invite users to join the project, so the project.member with be with those users
    invite(projectID:string, users:User[]) : Observable<Project>{
        const url = `${this.config.url}/${this.domain}/${projectID}`
        return this.http.get<Project>(url).pipe(switchMap(project=>{
            const existingMembers = project.members? project.members:[]
            var newMembers=users?.map(user=>user.id as string)?.filter(id=>!!id)
            newMembers =union(...existingMembers, ...newMembers)
            return this.http.patch<Project>(url,{members:newMembers}, {headers:this.headers}).pipe(map(res=>res))

        }))


    } 


    
    
}