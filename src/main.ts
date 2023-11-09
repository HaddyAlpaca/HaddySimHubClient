import { enableProdMode, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ServicesModule } from './app/services/services.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ServicesModule),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
