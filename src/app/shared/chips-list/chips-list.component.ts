import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { filter, from, map, Observable, startWith, switchMap, tap } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'chips-list',
  template: `
  <style>
    :host::ng-deep .mat-form-field-infix{
      width: 20vw;

    }
  
  
  
  </style>
<mat-form-field class="example-chip-list" appearance="fill">
  <mat-chip-list #chipList aria-label="Fruit selection">
    <mat-chip
      *ngFor="let fruit of pinnedOnChip"
      (removed)="remove(fruit)">
      {{fruit}}
      <button matChipRemove>
        <mat-icon>cancel</mat-icon>
      </button>
    </mat-chip>
  </mat-chip-list>
  <input
      placeholder="Search Members..."
      #chipInput
      [formControl]="chipCtrl"
      [matAutocomplete]="auto"
      [matChipInputFor]="chipList"
      [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
      (matChipInputTokenEnd)="add($event)">
  <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
    <mat-option *ngFor="let result of filteredResult | async" [value]="result?.name">
      {{result?.name}}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>
  `,
})
export class ChipsListComponent implements OnInit,OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl('');
  filteredResult!: Observable<any[]>;
  @Input() pinnedOnChip: string[] = [];
  allMembers: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @Input() target = "user"
  request$:any = this.userService;

  @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;


  checkTargetChuck(){
      switch(this.target){
        case("user"):
          this.request$ = this.userService
           break;
        default:
          this.request$ = this.userService
      }
  }
  

  constructor(private userService: UserService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple changes",changes)
    
    if(changes['target']){
      if(changes['target'].currentValue !== changes?.['target'].previousValue){
        this.checkTargetChuck()
      }
    }
  }
  ngOnInit(): void {

    this.filteredResult = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      // map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allMembers.slice())),
      filter(val=>val),
      switchMap(val=>{
        if(this.request$ = this.userService){
          return (this.request$ as UserService).search(val)
        }else 
        return from([])
      }),  map(users=>{
      
       users=users.filter(user=> this.pinnedOnChip?.indexOf(user?.name)==-1)
       console.log(users)
       return users
      
      })
    );

    
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.pinnedOnChip.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.chipCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.pinnedOnChip.indexOf(fruit);

    if (index >= 0) {
      this.pinnedOnChip.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.pinnedOnChip.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMembers.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
