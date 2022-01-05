import { NgModule,SkipSelf, Optional} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {MatIconRegistry} from '@angular/material/icon';
import{DomSanitizer} from '@angular/platform-browser'
import { loadSvgResources } from '../utils/svg.util';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

  ],
  imports: [
    CommonModule, 
    SharedModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent

  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parent: CoreModule,
  ir: MatIconRegistry,
  ds: DomSanitizer){

    if(parent){
      throw new Error('MOdule exists, cannot be reloaeded');
    }

    loadSvgResources(ir,ds);
  }
}
