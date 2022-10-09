import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/domain';
import { getAuthState, RootState } from 'src/app/store';
import { LOGOUT } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  public auth$!:Observable<Auth>
  constructor(private store$: Store<RootState>) { 

    this.auth$ = this.store$.select(getAuthState)
  }

  ngOnInit(): void {
  }

  openSiderbar(){

    this.toggle.emit();

  }

  onChange(checked:boolean){

    this.toggleDarkTheme.emit(checked);

  }
  logout(){

    this.store$.dispatch(LOGOUT())

  }
}
