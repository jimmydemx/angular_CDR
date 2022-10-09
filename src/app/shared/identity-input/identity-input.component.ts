import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'identity-input',
  template: `
      <div>
          <mat-select placeholder="ID" (selectionChange)="onIdTypeChange($event)" [value]="selectValue">
            <mat-option *ngFor="let type of identityTypes" [value]='type.value'>{{type.label}}</mat-option>
          </mat-select>
      </div>
      <div class="id-input">
        <mat-form-field>
          <input matInput placeholder="ID Number" [(ngModel)]="InputValue" (change)="onIdNoChange($event)" type="text">
          <mat-error></mat-error>
        </mat-form-field >
      </div>
  `,
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: IdentityInputComponent,
    multi:true
  },{
    provide: NG_VALIDATORS,
    useExisting: IdentityInputComponent,
    multi:true
  }

  ]
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor,Validator {
  public binding=''
  public InputValue =''
  public selectValue=''
  onChange!: (value:any)=>void;
  constructor() { }


  validate(control: AbstractControl): ValidationErrors | null {
    console.log("conttrol",control);
    // control.value
    return null;
  }



  writeValue(obj: any): void {
    this.selectValue =obj?.idType
    this.InputValue=obj?.idNum
     console.log(obj)
    
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    
  }
  registerOnTouched(fn: any): void {
  
  }
  ngOnInit(): void {
    this.InputValue =''
    
  }

  // Changefn = (_: any)=>void
 
  
  identityTypes:Array<any> =[
    {label: "Passport",
      value:"Passport"
    },
    {label: "Military",
    value:"Military"
  },
  {label: "Driving Liscence",
  value:"Driving Liscence"
},
  ]
    
  onIdTypeChange(e:any){
    this.selectValue = e.value;
    this.onChange({idType:e.value,idNum:this.InputValue})
     console.log("onIdTypeChange",e);
  }

  onIdNoChange(e:any){
    this.InputValue = e?.target?.value
    this.onChange({idType:this.selectValue,idNum:e?.target?.value})
    console.log("onIdNoChange",e?.target?.value);
  }


}
