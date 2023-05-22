import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  openState = false;
  animationState = false;

  @Input() usuarioLogado!: string;

  constructor(
  ) {}

  ngOnInit() {
  }

  changeOpenStateDesktop(event: any) {
    if (this.animationState === false) {
      if (
        (event.type === 'mouseleave' && this.openState === false) ||
        (event.type === 'click' && this.openState === false)
      ) {
        return;
      }
      this.openState = !this.openState;
      this.animationState = true;
      setTimeout(() => (this.animationState = false), 150);
    }
  }

  changeOpenStateMobile() {
    this.openState = !this.openState;
  }
}
