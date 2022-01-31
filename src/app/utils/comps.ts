export function comps(){
    interface A {
        prototype?:any;
    }

    return <T extends object, U extends keyof T>(target:T,key:U)=>{

        var val= target[key]
        
        Object.defineProperty(target,key,{
            get: function(){
                return val;
    
            },
            set: function(value:any){

                return value+"485";
            }
        })
    }






}