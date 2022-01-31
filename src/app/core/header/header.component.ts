import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  openSiderbar(){

    this.toggle.emit();

  }

  onChange(checked:boolean){

    this.toggleDarkTheme.emit(checked);

  }
}
