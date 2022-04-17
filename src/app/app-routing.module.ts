import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './features/pages/about/about.component';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';
import { LoginComponent } from './features/pages/login/login.component';
import { PaymentPlansComponent } from './features/pages/payment-plans/payment-plans.component';
import { PaymentMethodsComponent } from './features/pages/payment-methods/payment-methods.component';
import { UsComponent } from './features/pages/us/us.component';
import { AdminPageComponent } from './features/pages/admin-page/admin-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { StartingComponent } from './features/pages/admin-page/starting/starting.component';
import { QrGeneratorComponent } from './features/pages/admin-page/qr-generator/qr-generator.component';

const routes: Routes = [

  { path: '', component: LandingPageComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'us', component: UsComponent },
  { path: 'login', component: LoginComponent, data: { username: '', password: '' } },
  { path: 'payment-plans', component: PaymentPlansComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent, data: { index: '' } },
  {
    path: 'admin-page', component: AdminPageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'starting',
        component: StartingComponent,
      },
      {
        path: 'qr-generator',
        component: QrGeneratorComponent
      },
      {
        path: '**',
        redirectTo: 'starting',
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
