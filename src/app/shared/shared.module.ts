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


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent
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
    DirectiveModule,
    ReactiveFormsModule,
    FormsModule,
    ServicesModule


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
    ConfirmDialogComponent,
    DirectiveModule,
    ReactiveFormsModule,
    FormsModule,
    ServicesModule,
    ImageListSelectComponent
    
  ],
  entryComponents:[ConfirmDialogComponent]
})
export class SharedModule { }
