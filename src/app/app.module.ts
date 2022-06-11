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
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminPageComponent } from './features/pages/admin-page/admin-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { StartingComponent } from './features/pages/admin-page/starting/starting.component';
import { TabComponent } from './shared/components/tab/tab.component';
import { QrGeneratorComponent } from './features/pages/admin-page/qr-generator/qr-generator.component';
import { MobileViewComponent } from './features/pages/admin-page/qr-generator/components/mobile-view/mobile-view.component';
import { QrDialogComponent } from './features/pages/admin-page/qr-generator/components/qr-dialog/qr-dialog.component';
import { ReportsComponent } from './features/pages/admin-page/reports/reports.component';

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
    PaymentMethodsComponent,
    AdminPageComponent,
    StartingComponent,
    TabComponent,
    QrGeneratorComponent,
    MobileViewComponent,
    QrDialogComponent,
    ReportsComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatButtonModule,
    MatFormFieldModule,

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
