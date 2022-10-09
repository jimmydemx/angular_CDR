export enum IdentityType{
    Idcard=0,
    Insurance,
    Passport,
    Military,
    Other
}
export interface Identity{

    identityNo: string;
    identityType: IdentityType

}

export interface Address{
    country:string
    province:string;
    city:string;
    street?: string;
}

export interface User {
    id? : string;
    email :string;
    password: string;
    name: string;
    avatar: string;
    address:Address;
    idInfo: {[key:string]:any},
    dateOfBirth?: string;
    projectIds?: string[];

}