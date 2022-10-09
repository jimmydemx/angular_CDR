import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { AppStoreModule } from './store';
import { demo } from './utils/inject_demo';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        RouterModule.forRoot([]),
        MatSidenavModule,
        AppStoreModule

      ],
      declarations: [
        AppComponent
      ],
      providers:[
        {
          provide: APP_BASE_HREF, 
          useValue: '/'
          
        },
        demo,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('create a DOM with class=site', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.site')).toBeTruthy()
  });
});
