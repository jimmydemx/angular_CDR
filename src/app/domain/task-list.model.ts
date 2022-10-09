export interface taskList{
    id?:string | null;
    name?: string;
    order:number;
    taskIds?: string[];
    projectId?:string;
}