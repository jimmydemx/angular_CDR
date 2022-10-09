import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Address } from 'src/app/domain';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'area-list',
  template: `
    <div>
      <mat-select (valueChange)="OnCountryChange($event)">
        <mat-option *ngFor="let item of locationService.getCountry()| async" [value]="item">{{item}}</mat-option>
      </mat-select>
      <mat-select (valueChange)="OnProvinceChange($event)">
        <mat-option *ngFor="let item of provinces" [value]="item">{{item}}</mat-option>
      </mat-select>
      <mat-select (valueChange)="OnCityChange($event)">
        <mat-option *ngFor="let item of cites" [value]="item">{{item}}</mat-option>
      </mat-select>
      <input matInput placeholder="Street" (change)="OnStreetChange($event.target)">
    </div>
  `,
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: AreaListComponent,
    multi: true
  }]
})
export class AreaListComponent implements OnInit,ControlValueAccessor {
  onChange!:(value:any)=>void;
  public country!:string
  public province!:string
  public city!: string
  public street!:string | undefined

  public countries!:string[]
  public provinces!:string[]
  public cites!:string[]
  public streets!: string[]| undefined

  constructor(public locationService : LocationService) { 

  }


  writeValue(obj: Address): void {
    console.log("feafa",obj)
      this.country = obj.country
      this.province= obj.province
      this.city = obj.city
      this.street = obj?.street

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;

  }
  registerOnTouched(fn: any): void {
    
  }

  ngOnInit(): void {
  }


  OnCountryChange(e:any){
    this.country = e;
    this.locationService.getProvince(e).subscribe(val=>this.provinces=val)
    console.log("OnCountryChange",e);
    this.onChange({country: this.country, province:this.province, city:this.city,street:this.street});
    
  }
  OnProvinceChange(e:any){

    console.log(e)
    this.province =e;
    this.onChange({country: this.country, province:this.province, city:this.city,street:this.street})
    this.locationService.getCity(e).subscribe(val=>this.cites=val)
  }

  OnCityChange(e:any){
    console.log(e)
    this.city= e;
    this.onChange({country: this.country, province:this.province, city:this.city,street:this.street})
  }

  OnStreetChange(e:any){

    console.log(e?.value)
    this.street = e?.value;
    this.onChange({country: this.country, province:this.province, city:this.city,street:this.street})
  }

}
