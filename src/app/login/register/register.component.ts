import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/domain';
import { REGISTER } from 'src/app/store/actions/auth.action';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  selectedIndex!:number
  form!: FormGroup;
  items: string[] = [];
  private readonly avatarName='avatars';

  constructor(private fb: FormBuilder,private store$: Store<User>) { }

  ngOnInit(): void {

    const img= `${this.avatarName}:svg-${Math.floor(Math.random()* 16).toFixed(0)}`

    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    this.items=nums.map(item=>{
      return `avatars:svg-${item}`
    })


    this.form = this.fb.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
      name:['', Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.minLength(6)])],
      repeat:['',Validators.compose([Validators.minLength(6)])],
      avatar:[img],
      age:['',Validators.compose([Validators.required])],
      // idInfo: new FormControl({idType: idType})
      idInfo: [{idType:'',idNum: ''},Validators.compose([Validators.required])],
      location:[{country:'',province:'',city:'',street:''},Validators.compose([Validators.required])]

    })

    // idInfo: ({
    //   idType:new FormControl('',Validators.compose([Validators.required])),
    //   idNum: new FormControl('',Validators.compose([Validators.required]))
    // }),

    // location: new FormGroup({
    //   country: new FormControl('',Validators.compose([Validators.required])),
    //   province:new FormControl('',Validators.compose([Validators.required])),
    //   city:new FormControl('',Validators.compose([Validators.required])),
    //   street: new FormControl('',Validators.compose([Validators.required])),
    // })

    this.form.get('idInfo')?.valueChanges.subscribe(val=>console.log('fwefwef',val))
    this.form.valueChanges.subscribe(val=>console.log('entire form',val))
  }


  onSubmit(form:any, event:any){
    event.preventDefault();
    this.store$.dispatch(REGISTER(this.form?.value))

    if(!form.valid){
        return;
    }
    console.log(form.value);
  }

  onChange($e:any){


  }
  onClickNext(){
   if(this.form.invalid){
    

   }else{


    this.selectedIndex =1
   }


  }
}
