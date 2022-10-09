import { Component, forwardRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { asyncScheduler, combineLatest, combineLatestAll, debounce, debounceTime, distinctUntilChanged, filter, interval, map, mapTo, merge, Observable, scheduled, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-age-modules',
  template: `
    <style>
    
    
    </style>
    <div [formGroup]="form" class="age-input">
          <mat-form-field>
              <mat-label>Choose a date</mat-label>
              <input matInput [matDatepicker]="picker" type="text" formControlName='birthday'>
              <mat-error>Date error</mat-error>
              <mat-datepicker #picker></mat-datepicker>
              <mat-datepicker-toggle  matSuffix [for]="picker"></mat-datepicker-toggle>
          </mat-form-field>

          <ng-container formGroupName='age'>
 
               <mat-form-field>
                   <mat-label>age</mat-label>
                    <input type="text" matInput formControlName='ageNum'>
                    <mat-error>{{form.get('age')?.get('ageNum')?.errors?.['error']}}</mat-error>
              </mat-form-field>

            <mat-button-toggle-group name="fontStyle" aria-label="Font Style"  formControlName='ageUnit'>
                <mat-button-toggle value="year">Year</mat-button-toggle>
                <mat-button-toggle value="month">Month</mat-button-toggle>
                <mat-button-toggle value="day">Day</mat-button-toggle>
            </mat-button-toggle-group>
            <!-- <mat-error *ngIf="form.get('age').hasError()">Age or Unit error</mat-error> -->
          </ng-container>


      </div>
  `,
  styles: [
  ],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:AgeModulesComponent,
      multi: true
    }
    // ,{
    //   provide:NG_VALIDATORS,
    //   useExisting: forwardRef(()=> AgeModulesComponent),
    //   multi: true
    // }
  ]
})
export class AgeModulesComponent implements OnInit, ControlValueAccessor{

  form!:FormGroup;
  private propagateChange = (_: any)=>{}


  constructor(private fb: FormBuilder,private inj: Injector) {
    this.form= this.fb.group({
      birthday:['',Validators.compose([Validators.required])],
      age: this.fb.group({
          ageNum:['',Validators.compose([this.checknum])],
          ageUnit:['']
      })
  })


   }

   checknum(c:any):{[key:string]:any} | null{

    const pattern =/^[1-9]\d*$/;
    if(!pattern.test(c.value)|| c.value >99 || c.value<0){
      return {error: "this is not valid number"}
    }
    return null;


   }
  writeValue(obj: any): void {


    console.log("writevalue",obj)
      
  }

  registerOnChange(fn: any): void {
    this.propagateChange =fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }



  ngOnInit(): void {

 
    // get value from the form
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age')?.get('ageNum');
    const  ageUnit = this.form.get('age')?.get('ageUnit');
  

    
    const birthday$ = birthday?.valueChanges.pipe(map(val=>{
      // this.propagateChange(val);
      return {date:val, from:'birthday'}
    }), filter(_=> (this.form.get('birthday') as any)?.valid))


    const ageNum$ = ageNum?.valueChanges.pipe(map(val=>{    
      // this.propagateChange(val);
      return {data:val, from:'ageNum'}}, debounceTime(300)),
      // filter(_=> (this.form.get('ageNum') as any)?.valid)
      )
    const ageUnit$ = ageUnit?.valueChanges.pipe(map(val=>{  
      //  this.propagateChange(val); 
       return {data:val, from:'ageUnit'}},debounceTime(300)),
      //  filter(_=> (this.form.get('ageUnit') as any)?.valid)
       );

       birthday?.setValue("2001-11-30T23:00:00.000Z")
       var d= new Date()
       console.log(d.setDate(d.getDate()),d.setDate(d.getDate()-365))

    merge(birthday$ as Observable<{date:any, from:'birthday'}>,combineLatest([ageNum$,ageUnit$])).subscribe(val=>{

      debugger;
      var d= new Date()
      if(Array.isArray(val) && !this.form.get('age')?.get('ageNum')?.errors){
        
        // get the date from Date Input 
        const data = new Date().getTime()-new Date(birthday?.value).getTime()
        const  CalDate= this.GetDateFromInput(data)

      if(CalDate.num !== (val as Array<any>)[0].data || CalDate.unit !== (val as Array<any>)[1].data){

          switch((val as Array<any>)[1].data){
            case "year":
              birthday?.patchValue(new Date(d.setDate(d.getDate()-(val as Array<any>)[0].data*365)))
              // this.form.controls['birthday'].setValue(d.setDate(d.getDate()-(val as Array<any>)[0].data*365)) 
              console.log("year");
              break;
            case "month":
              birthday?.patchValue(new Date(d.setDate(d.getDate()-(val as Array<any>)[0].data*30)))
              console.log("month");
              break
            case "day":
              birthday?.patchValue(new Date(d.setDate(d.getDate()-(val as Array<any>)[0].data)))
              console.log("day");
              break  
          }
        }  
      } 
      else if((val as any)?.from =='birthday'){

        const data = new Date().getTime()-new Date((val as any)?.date).getTime()

        const  CalDate= this.GetDateFromInput(data)

        if(CalDate.num != ageNum?.value){
          ageNum?.setValue(CalDate.num)
        }
        if(CalDate.unit != ageUnit?.value){
          ageUnit?.setValue(CalDate.unit)
        }
        // 86400000
        
      }
     
      
      console.log(val,this.form.get('birthday'),  this.form.get('age')?.get('ageNum')?.errors?.['error'])
      this.propagateChange(this.form.get('birthday')?.value)

      
      
    }) 

    }

    GetDateFromInput(data:number){
      // 86400000
      // console.log(Math.ceil(data/86400000/365))
      if(Math.ceil(data/86400000/365)==1){
        if(Math.ceil(data/86400000/30)>1){
          return {num:Math.floor(data/86400000/30), unit:"month"}
        }else{
          return {num:Math.floor(data/86400000), unit:"day"}
        }
      }else{
        return {num:Math.floor(data/86400000/365), unit:"year"}
      }

      
    }

}
