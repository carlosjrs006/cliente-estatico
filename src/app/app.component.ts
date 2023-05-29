
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeAnimation } from 'src/assets/animations/page-transition';
import { LoaderService } from './shared/services/loader.service';
import { LoginService } from './shared/services/login.service';
import { MessageService } from './shared/services/message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {

  // username!: string;
  // isLogged!: boolean;
  // isAdmin!: boolean;

  constructor(
    private contexts: ChildrenOutletContexts,
    public loaderService: LoaderService,
    private messageService: MessageService,
    private loginService: LoginService
  ) {
    // this.configure();
  }

  ngOnInit(): void {
  }

  getRouteAnimationData() {
    let data =
      this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    return data;
  }


  // authConfig: AuthConfig = {
  //   issuer: 'http://localhost:8888/auth/realms/pdv-web',
  //   redirectUri: window.location.origin,
  //   clientId: 'pdv-frontend',
  //   responseType: 'code',
  //   scope: 'openid profile email offline_access',
  //   showDebugInformation: true,
  // };

  // configure(): void {
  //   this.oauthService.configure(this.authConfig);
  //   this.oauthService.tokenValidationHandler = new NullValidationHandler();
  //   this.oauthService.setupAutomaticSilentRefresh();
  //   this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
  //     .then(() => {
  //       if (this.oauthService.getIdentityClaims()) {
  //         this.isLogged = this.loginService.getIsLogged();
  //         this.isAdmin = this.loginService.getIsAdmin();
  //         this.username = this.loginService.getUsername();
  //         this.messageService.sendMessage(this.loginService.getUsername());
  //       }
  //     });
  // }

}
