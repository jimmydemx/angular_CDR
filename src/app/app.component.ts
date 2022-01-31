import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { demo } from './utils/inject_demo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularCRM';
  darkTheme =false;
  squreState:string ='';

  constructor(private oc:OverlayContainer,d:demo){
    console.log("d.a",d.a);
    
  }

  switchTheme(dark:boolean){
    this.darkTheme = dark;
  }

  ngOnInit(): void {
    
  }

  OnClick(){


  }  
  
}
