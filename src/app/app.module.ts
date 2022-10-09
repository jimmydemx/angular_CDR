import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider'
import {MatSidenavModule} from '@angular/material/sidenav'
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { demo } from './utils/inject_demo';
import './utils/debug.util'
import { AppStoreModule } from './store';
import { Base_config, BASE_CONFIG } from './services/quote.service';
import { ProjectService } from './services/project.service';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    SharedModule,
    AppRoutingModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    AppStoreModule,

  
  ],
  providers: [demo],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor(){
      // @Inject(BASE_CONFIG) private base_config: Base_config
      // console.log('base_config_app_modules', this.base_config);

      // private ProjectService: ProjectService
      // console.log("project service");
        

    }
 }
