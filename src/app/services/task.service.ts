import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { count, filter, from, map, mergeMap, Observable, reduce, switchMap } from 'rxjs';
import { Task, taskList } from '../domain';
import { BASE_CONFIG, Base_config } from './quote.service';


@Injectable({providedIn: 'root'})
export class TaskService {

    private readonly domain = 'tasks'
    private headers = {
        'Content-Type': "application/json"
    }
    constructor(private http: HttpClient,@Inject(BASE_CONFIG) private config:Base_config) { 
        console.log("base_config",this.config);
        
    }

    add(task: Task):Observable<Task>{
        task.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http.post<Task>(url, JSON.stringify(task), {headers:this.headers }).pipe(map(res=> res))
    }


    update(task: Task):Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`;

        const toUpdate ={
            ...(task?.completed&&{completed:task?.completed}),
            ...(task?.desc&&{desc:task?.desc}),
            ...(task?.priority&&{priority:task?.priority}),
            ...(task?.ownerId&&{ownerId:task?.ownerId}),
            ...(task?.participantIds&&{participantIds:task?.participantIds}),
            ...(task?.remark&&{remark:task?.remark}),
        }
        return this.http.patch<Task>(url, JSON.stringify(toUpdate), {headers:this.headers }).pipe(map(res=> res))
    }

    del(task:Task):Observable<Task> | undefined{

        if(task.id){
            const delTasks$ = from(task.id).pipe(mergeMap(listid=>this.http.delete(`${this.config.url}/taskLists/${listid}`)),count())

            return delTasks$.pipe(switchMap(_=> this.http.delete(`${this.config.url}/${this.domain}/${task.id}`)),map(_=>task))
        }
        return  undefined;

    }

    get(taskListId:string) :Observable<Task[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http.get<Task[]>(url, {params:{'taskListId':taskListId}})

    }

    getByLists(lists: taskList[]):Observable<Task[]> {

        return from(lists).pipe(filter(list => !!(list && list?.id)), mergeMap(list => {
            return this.get(((list as taskList).id as string));
        })
        ).pipe(reduce((task: Task[], t:Task[])=>[...task,...t],[]));
    }

    complete(task: Task):Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`;
        return this.http.patch<Task>(url,JSON.stringify({completed:!task.completed}),{headers:this.headers})
    }

    move(taskId:string, taskListId:string):Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${taskId}`;
        return this.http.patch<Task>(url, JSON.stringify({taskListId: taskListId}),{headers:this.headers})
    }

    moveAll(srcListID:string, targetListId:string): Observable<Task[]>{
        return this.get(srcListID).pipe(mergeMap(tasks=>from(tasks)),filter(task=>!!(task&&task?.id)),mergeMap(task=>this.move(task.id as string,targetListId))).pipe(reduce((arr:Task[],val:Task)=>[...arr,val],[]))

    }
}   
