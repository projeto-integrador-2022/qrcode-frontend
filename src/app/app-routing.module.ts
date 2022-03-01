import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './features/pages/about/about.component';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';
import { UsComponent } from './features/pages/us/us.component';

const routes: Routes = [
  
    { path:'landing-page', component:LandingPageComponent},
    { path:'about', component:AboutComponent},
    { path:'us', component:UsComponent},

   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
