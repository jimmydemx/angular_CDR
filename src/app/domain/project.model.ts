export interface Project{
    id?: string | null;
    name: string;
    desc?: string;
    coverImg:string;
    taskLists?: string[]; // list id
    members? : string[]; // member id
}