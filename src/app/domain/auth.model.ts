import { Err } from "./err.model";
import { User } from "./user.model";

export interface Auth{
    type?: string;
    user? : User;
    userId?:string;
    token? : string;
    err?: Err;


}