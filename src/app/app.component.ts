import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeAnimation } from 'src/assets/animations/page-transition';
import { LoaderService } from './shared/services/loader.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {

  constructor(
    private contexts: ChildrenOutletContexts,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {

  }

  getRouteAnimationData() {
    let data =
      this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    return data;
  }

}
