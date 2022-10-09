export interface Task{
    id?: string | null;
    desc: string;
    completed: boolean;
    priority: number;
    dueDate? : Date;
    reminder?: Date;
    remark? :string;
    createDate: Date;
    ownerId?:string;
    participantIds: string[];
    taskListId:string;

}