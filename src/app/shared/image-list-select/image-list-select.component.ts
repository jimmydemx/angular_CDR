import { Component, Input, forwardRef, Inject } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(()=>ImageListSelectComponent),
      multi: true
    },
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor{

  @Input() title="Select"
  @Input() col=6;
  @Input() rowHeight = "64px";
  @Input() items: string[]=[];
  @Input() useSvgIcon =false;
  @Input() itemWidth ="80px"

  selected!:any;
  constructor(dir: NgControl) { 

      console.log("")

  }

  private propagateChange = (_: any) => {};

  ngOnInit(): void {


  }


  writeValue(obj:any):void{
      // 可以调用 this.form.Setvalue....
      if (obj && obj !== '') {
        this.selected = obj;
      }
  }
  registerOnChange(fn:any):void{
    this.propagateChange = fn;
    // 当值发生变化时候通知表单
  }

  registerOnTouched(fn:any):void{
    // 点击然后离开，表示touch 表单了

  }

  validate(c: FormControl):{[key:string]:any}{
    return this.selected? {selected:"selected"}: {
      imageListInvalid:{
        valid: false
      }
    }
  }

  OnSelectChange(i:number){
    this.selected = this.items[i];
    // 更新表单
    this.propagateChange(this.items[i]);
  }
}
