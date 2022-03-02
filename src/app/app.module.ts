import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';
import { NavBarComponent } from './features/components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './features/pages/about/about.component';
import { UsComponent } from './features/pages/us/us.component';
import { LoginComponent } from './features/pages/login/login.component';
import { FooterComponent } from './features/components/footer/footer.component';
import { PaymentPlansComponent } from './features/pages/payment-plans/payment-plans.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavBarComponent,
    AboutComponent,
    UsComponent,
    LoginComponent,
    FooterComponent,
    PaymentPlansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
