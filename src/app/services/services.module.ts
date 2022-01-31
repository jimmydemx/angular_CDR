import { ModuleWithProviders, NgModule } from '@angular/core';
import { QuoteSevice } from './quote.service';



@NgModule()
export class ServicesModule { 
    static forRoot(): ModuleWithProviders<ServicesModule>{

        return {
          ngModule: ServicesModule,
          providers:[QuoteSevice]
        }
    }
}
