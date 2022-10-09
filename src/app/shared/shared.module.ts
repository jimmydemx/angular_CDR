import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatListModule} from '@angular/material/list'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatMenuModule} from "@angular/material/menu"
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AgeModulesComponent } from './age-modules/age-modules.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import {MatChipsModule} from '@angular/material/chips';
import { ChipsListComponent } from './chips-list/chips-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AreaListComponent } from './area-list/area-list.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeModulesComponent,
    IdentityInputComponent,
    ChipsListComponent,
    AreaListComponent,

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    DirectiveModule,
    ReactiveFormsModule,
    FormsModule,
    ServicesModule,
    MatButtonToggleModule,
    MatChipsModule
    


  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatChipsModule,
    ConfirmDialogComponent,
    DirectiveModule,
    ReactiveFormsModule,
    FormsModule,
    ServicesModule,
    ImageListSelectComponent,
    MatButtonToggleModule,
    AgeModulesComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent
    
  ],
  entryComponents:[ConfirmDialogComponent, ImageListSelectComponent]
})
export class SharedModule { }
