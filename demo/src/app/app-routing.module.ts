import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { ForgototpComponent } from './forgototp/forgototp.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [{path:'signup',component:SignupComponent},
{path:'login',component:LoginComponent},
{path:'otp',component:OtpComponent},
{path:'emailverification',component:EmailverificationComponent},
{path:'forgototp',component:ForgototpComponent},
{path:'resetpassword',component:ResetpasswordComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
