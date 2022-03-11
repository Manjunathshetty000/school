import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SdashboardComponent } from './sdashboard/sdashboard.component';
import { TdashboardComponent } from './tdashboard/tdashboard.component';
import { VetComponent } from './vet/vet.component';


const routes: Routes = [
  {path:"vet",component:VetComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"teacher",component:TdashboardComponent},
  {path:"student",component:SdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
