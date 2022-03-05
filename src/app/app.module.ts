import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './features/pages/about/about.component';
import { UsComponent } from './features/pages/us/us.component';
import { LoginComponent } from './features/pages/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PaymentPlansComponent } from './features/pages/payment-plans/payment-plans.component';
import { ContactUsFormComponent } from './shared/components/contact-us-form/contact-us-form.component';
import { PaymentMethodsComponent } from './features/pages/payment-methods/payment-methods.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/shared/modules/material-module';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavBarComponent,
    AboutComponent,
    UsComponent,
    LoginComponent,
    FooterComponent,
    PaymentPlansComponent,
    ContactUsFormComponent,
    PaymentMethodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
