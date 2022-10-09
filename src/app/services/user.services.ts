import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, from, map, mergeMap, Observable, of, reduce } from 'rxjs';
import { Project, User } from '../domain';
import { Base_config, BASE_CONFIG } from './quote.service';

@Injectable({providedIn: 'root'})
export class UserService {
    private readonly domain = 'users';
    private headers = {
        'Content-type': 'application/json'
    }

    constructor(private http:HttpClient, @Inject(BASE_CONFIG)private config:Base_config) { }


    search(filter:string):Observable<User[]>{
        const url = `${this.config.url}/${this.domain}`
        return this.http.get<User[]>(url,{params:{'email_like':filter}})
    }

    getUsersByProject(projectId:string):Observable<User[]>{
        const url = `${this.config.url}/${this.domain}`
        return this.http.get<User[]>(url, {params: {'projectId':projectId}})
    }

    addProjectRef(user:User, projectId:string):Observable<User>{
        const url = `${this.config.url}/${this.domain}/${user?.id}`
        const projectIds = user.projectIds ? user.projectIds: [];

        if(projectIds.indexOf(projectId)>-1){
            return of(user);
        }
        return this.http.patch<User>(url, JSON.stringify({projectIds:[...projectIds,projectId]}),{headers: this.headers}).pipe(map(res=>res as unknown as User))
    }

    removeProjectRef(user:User, projectId:string):Observable<User>{
        const url = `${this.config.url}/${this.domain}/${user?.id}`
        const projectIds = user.projectIds ? user.projectIds: [];
        const index = projectIds.indexOf(projectId)
        if(index===-1){
            return of(user)
        }
        const toUpdate = [...projectIds.slice(0,index),...projectIds.slice(index+1)]
        return this.http.patch(url, JSON.stringify({projectIds:toUpdate}),{headers: this.headers}).pipe(map(val=>val as User))

    }

    batchUpdateProjectRef(project: Project) :Observable<User[]> | void{
        const projectId= project.id
        const memberIds = project.members? project.members:[]

        if(projectId){
           return  from(memberIds).pipe(mergeMap(id=>{
                const url = `${this.config.url}/${this.domain}/${id}`
                 return this.http.get<User>(url)
             }), map(user=>user as User), filter(user=>user.projectIds?.indexOf(projectId)===-1),
             mergeMap(user=>this.addProjectRef(user,projectId)),
             reduce<User,User[]>((arr,user)=>[...arr,user],[])
                 )
        }

   
        
        // this.http.get<User>(url).pipe(reduce<User,User[]>((arr,val)=>[...arr,val],[]))


    }
}