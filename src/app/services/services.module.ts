import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProjectService } from './project.service';
import {  QuoteSevice } from './quote.service';



@NgModule()
export class ServicesModule { 
    static forRoot(): ModuleWithProviders<ServicesModule>{

        return {
          ngModule: ServicesModule,
          providers:[QuoteSevice, ProjectService]
        }
    }
}
