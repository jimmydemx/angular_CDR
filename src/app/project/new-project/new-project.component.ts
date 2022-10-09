
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  public id=''
  public title='';
  public name ='';
  public desc='';
  public coverImgs=[];
  public coverImg =new FormControl('')
  @ViewChild('nameControl') nameDirective!:NgModel
  @ViewChild('descControl') descDirective!:NgModel

  constructor(@Inject(MAT_DIALOG_DATA) private data:any, 
  private dialogRef: MatDialogRef<NewProjectComponent>,
  private cd: ChangeDetectorRef


  ) { 

  }

  ngOnInit(): void {
    this.title= this.data.title;
    this.coverImgs = [...this.data?.thumbNails as []]
    this.coverImg.setValue(this.data?.coverImg)
    this.name = this.data?.name
    this.desc = this.data?.desc
    this.id = this.data?.id;

    console.log(JSON.stringify(this.data),this.nameDirective)
    // const imgs= `avatars:svg-${Math.floor(Math.random()* 16).toFixed(0)}`

    // const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    // this.coverImgs=nums.map(item=>{
    //   return `avatars:svg-${item}`
    // })

    // this.oc.themeClass = this.data.dark? "unicorn-dark-theme":null;
  }
  onClick(){


    this.dialogRef.close(this.data);
    


  }

  ngAfterViewInit(){
    console.log(JSON.stringify(this.data),this.nameDirective)

    this.cd.detectChanges()
    this.nameDirective.control.valueChanges.subscribe(val=>{ return this.data.name=val})
    this.descDirective.control.valueChanges.subscribe(val=>this.data.desc=val)
    this.coverImg.valueChanges.subscribe(val=>this.data.coverImg = val)


    this.nameDirective.control.setValidators([Validators.minLength(3),this.checkName])
    this.descDirective.control.setValidators([Validators.minLength(3)])
   
   
  }


  getNameErrors(){
      if(this.nameDirective?.control?.invalid){
        if(this.nameDirective?.control?.errors?.['firstLetterError']){
          return this.nameDirective?.control?.errors?.['firstLetterError']
        }
          
          if(this.nameDirective?.control?.errors?.['minlength']){
            return "minimal length shall be 3"
          }
      }
      return null
  }

  checkName(c:any):{[key:string]:any} |null {

    const pattern = /^[a-zA-Z]/
    console.log()
      if(pattern.test(c.value)){
        return null
      }else{
        return {firstLetterError: "it shall start with letter"}
      }
      

  }

  getGlobalValidation(){

    return this.nameDirective?.control?.value=='' || this.descDirective?.control?.value=='' || this.nameDirective?.control?.invalid || this.descDirective?.control?.invalid

  }

}
