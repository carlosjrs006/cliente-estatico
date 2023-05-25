import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { SharedModule } from './shared/shared.module';
import { HttpConfigInterceptor } from './shared/interceptors/http-config.interceptor';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    HttpClientXsrfModule,
    SharedModule,
    OAuthModule.forRoot({
      resourceServer:
      {
          allowedUrls: ['https://clientes-api-production-8c38.up.railway.app/clientes','http://localhost:8081/cleintes'],
          sendAccessToken: true
      }
  })

  ],
  providers: [
    LoadingInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    // HttpConfigInterceptor,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpConfigInterceptor,
    //   multi: true,
    // },
    {
      provide: LOCALE_ID,
      useValue: 'pt-br'
    },
    {
    provide:DEFAULT_CURRENCY_CODE,
    useValue:'BRL'
    }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]

})
export class AppModule {}
